import { Scenes } from 'telegraf'
import gridStep from '../actions/grid/gridWizard'

export const gridSceneName = 'SCENE_GRID_SIZE_INPUT'
export const gridScene = new Scenes.BaseScene(gridSceneName)

gridScene.enter((ctx) => {
  ctx.editMessageText('⏹️ Grid Wizard [Step 2/3]\n\nPlease, send me the grid size (from 3 to 15)', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Back',
            callback_data: 'back'
          }
        ]
      ]
    }
  })
})

gridScene.on('text', (ctx) => {
  if ('text' in ctx.message) {
    const size = Number(ctx.message.text)
    if (isNaN(size) || size < 3 || size > 15) {
      return ctx.reply('Please send me a number between 3 to 15. Please try again.')
    }

    ctx.wizards[ctx.from.id].body.options.size = Number(ctx.message.text)
    gridStep.period(ctx)
    return ctx.scene.leave()
  }
})
