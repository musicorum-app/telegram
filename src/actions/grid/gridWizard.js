import GeneratorWizard from '../../utils/GeneratorWizard'
import { gridSceneName } from '../../scenes/gridSizeInput'
import { Emojis } from '../../constants'

const gridStepTop = (ctx) => {
  const { wizards } = ctx
  const wizard = new GeneratorWizard('grid', {
    optionsMessageFactory: createGridOptionsMessage
  })
  wizards[ctx.from.id] = wizard

  ctx.editMessageText('⏹️ Grid Wizard [Step 1/3]\n\nSelect a top element to display', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Top Artists',
            callback_data: 'artists'
          },
          {
            text: 'Top Tracks',
            callback_data: 'tracks'
          },
          {
            text: 'Top Albums',
            callback_data: 'albums'
          }
        ],
        [
          {
            text: 'Back',
            callback_data: 'back'
          }
        ]
      ]
    }
  })
}

const gridStepSize = (ctx) => {
  const { wizards } = ctx
  if (!wizards[ctx.from.id]) return reject(ctx)
  wizards[ctx.from.id].step++
  if (ctx.match[0] !== 'back') {
    wizards[ctx.from.id].body.options.top = ctx.match[0]
  }
  ctx.scene.enter(gridSceneName)
}

const gridStepPeriod = (ctx, edit = false) => {
  const { wizards } = ctx
  if (!wizards[ctx.from.id]) return reject(ctx)
  wizards[ctx.from.id].step++
  const markup = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '7 Days',
            callback_data: '7day'
          },
          {
            text: '1 Month',
            callback_data: '1month'
          },
          {
            text: '3 Months',
            callback_data: '3month'
          }
        ],
        [
          {
            text: '6 Months',
            callback_data: '6month'
          },
          {
            text: '12 Months',
            callback_data: '12month'
          },
          {
            text: 'Overall',
            callback_data: 'overall'
          }
        ],
        [
          {
            text: 'Back',
            callback_data: 'back'
          }
        ]
      ]
    }
  }
  if (edit) {
    ctx.editMessageText('⏹️ Grid Wizard [Step 3/3]\n\nChoose a period', markup)
  } else {
    ctx.reply('⏹️ Grid Wizard [Step 3/3]\n\nChoose a period', markup)
  }
}

const createGridOptionsMessage = ({ size, period, story, names, playcount }) => {
  const createSwitchText = (text, value) => `${text}: ${value ? Emojis.check : Emojis.cross}\n`

  return '⏹️ Grid Wizard\nReady to generate!\n' +
  `Grid size: **${size}x${size}**\n` +
  `Period: **${period}**\n` +
  createSwitchText('Story Mode', story) +
  createSwitchText('Show names', names) +
  createSwitchText('Show playcount', playcount)
}

const gridStepConfirm = (ctx) => {
  const { wizards } = ctx
  const w = wizards[ctx.from.id]
  if (!wizards[ctx.from.id]) return reject(ctx)
  w.step++
  if (ctx.match[0] !== 'back') {
    w.body.options.period = ctx.match[0]
  }
  w.body.options.names = true
  w.body.options.playcount = true

  ctx.editMessageText(createGridOptionsMessage(w.body.options), {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Generate!',
            callback_data: 'generate'
          },
          {
            text: 'Nevermind, go back',
            callback_data: 'back'
          }
        ],
        [
          {
            text: 'Toggle Story Mode',
            callback_data: 'stories_mode'
          },
          {
            text: 'Toggle Grid Names',
            callback_data: 'grid_toggle_names'
          },
          {
            text: 'Toggle Grid Playcount',
            callback_data: 'grid_toggle_playcount'
          }
        ]
      ]
    }
  })
}

const reject = (ctx) => {
  ctx.editMessageText('❌ Try again')
}

exports.top = gridStepTop
exports.size = gridStepSize
exports.period = gridStepPeriod
exports.confirm = gridStepConfirm
