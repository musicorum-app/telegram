import { Emojis } from '../../constants'
import GeneratorWizard from '../../utils/GeneratorWizard'

const duotoneStepTop = (ctx) => {
  const wizard = new GeneratorWizard('duotone', {
    optionsMessageFactory: createDuotoneOptionsMessage
  })
  ctx.wizards[ctx.from.id] = wizard
  ctx.editMessageText('🎨 Duotone Wizard [Step 1/3]\nChoose a top element to display', {
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

const createDuotoneOptionsMessage = ({ pallete, period, story }) => {
  const createSwitchText = (text, value) => `${text}: ${value ? Emojis.check : Emojis.cross}\n`

  return '🎨 Duotone Wizard\nReady to generate!\n' +
  `Palette: ${pallete}\n` +
  `Period: ${period}\n` +
  createSwitchText('Story Mode', story)
}

const duotoneStepPeriod = (ctx) => {
  if (!ctx.wizards[ctx.from.id]) return reject(ctx)
  if (ctx.match[0] !== 'back') {
    ctx.wizards[ctx.from.id].body.options.top = ctx.match[0]
  }
  ctx.wizards[ctx.from.id].step++
  ctx.editMessageText('🎨 Duotone Wizard [Step 2/3]\nChoose a period', {
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
  })
}

const duotoneStepPalette = (ctx) => {
  if (!ctx.wizards[ctx.from.id]) return reject(ctx)
  if (ctx.match[0] !== 'back') {
    ctx.wizards[ctx.from.id].body.options.period = ctx.match[0]
  }
  ctx.wizards[ctx.from.id].step++

  ctx.editMessageText('🎨 Duotone Wizard [Step 3/3]\nChoose a color palette', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Purplish',
            callback_data: 'purplish'
          },
          {
            text: 'Natural',
            callback_data: 'natural'
          },
          {
            text: 'Divergent',
            callback_data: 'divergent'
          },
          {
            text: 'Sun',
            callback_data: 'sun'
          }
        ],
        [
          {
            text: 'Yellish',
            callback_data: 'yellish'
          },
          {
            text: 'Horror',
            callback_data: 'horror'
          },
          {
            text: 'Sea',
            callback_data: 'sea'
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

const duotoneStepConfirm = (ctx) => {
  if (!ctx.wizards[ctx.from.id]) return reject(ctx)
  const w = ctx.wizards[ctx.from.id]
  if (ctx.match[0] !== 'back') {
    ctx.wizards[ctx.from.id].body.options.pallete = ctx.match[0]
  }
  w.step++
  ctx.editMessageText(createDuotoneOptionsMessage(w.body.options), {
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
            text: 'Toggle Stories Mode',
            callback_data: 'stories_mode'
          }
        ]
      ]
    }
  })
}

const reject = (ctx) => {
  return ctx.editMessageText('❌ Try again')
}

exports.top = duotoneStepTop
exports.period = duotoneStepPeriod
exports.palette = duotoneStepPalette
exports.confirm = duotoneStepConfirm
