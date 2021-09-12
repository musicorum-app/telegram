import { Scenes } from 'telegraf'
import { wizards } from '..'
import gridStep from '../actions/grid/gridWizard'

export const gridSceneName = 'SCENE_GRID_SIZE_INPUT'
export const gridScene = new Scenes.BaseScene(gridSceneName)

gridScene.enter((ctx) => {
  ctx.editMessageText('⏹️ Grid Wizard [Step 2/3]\n\nPlease, input the grid size (3-8)', {
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
    if (!ctx.message.text.match(/^[3-8]$/)) {
      return ctx.reply('The grid size range is from 3 to 8. Please try again.')
    }

    wizards[ctx.from.id].body.options.size = Number(ctx.message.text)
    gridStep.period(ctx)
    return ctx.scene.leave()
  }
})
