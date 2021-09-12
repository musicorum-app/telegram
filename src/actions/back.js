import { wizards } from '..'
import duotoneWizard from './duotoneWizard'
import generate from '../commands/generate'

const back = (ctx) => {
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
  }
}

export default back
