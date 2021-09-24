import duotoneWizard from './duotone/duotoneWizard'
import generate from '../commands/generate'
import gridWizard from './grid/gridWizard'

const back = (ctx) => {
  const { wizards } = ctx
  const wizard = wizards[ctx.from.id]
  if (!wizard) return ctx.editMessageText('❌ Try again.')
  wizard.step--
  if (wizard.theme === 'duotone') {
    switch (wizard.step) {
      case 0:
        generate(ctx, true)
        break
      case 1:
        duotoneWizard.top(ctx)
        break
      case 2:
        duotoneWizard.period(ctx)
        break
      case 3:
        duotoneWizard.palette(ctx)
    }
  } else if (wizard.theme === 'grid') {
    if (ctx.scene.current) {
      ctx.scene.leave()
    }
    switch (wizard.step) {
      case 0:
        generate(ctx, true)
        break
      case 1:
        gridWizard.top(ctx)
        break
      case 2:
        gridWizard.size(ctx)
        break
      case 3:
        gridWizard.period(ctx, true)
        break
      case 4:
        gridWizard.confirm(ctx)
    }
  }
}

export default back
