import { wizards } from '../..'

const toggleGridNames = (ctx) => {
  if (!wizards[ctx.from.id]) return ctx.editMessageText('❌ Try again')
  const names = wizards[ctx.from.id].body.options.names
  wizards[ctx.from.id].body.options.names = !names

  if (names) {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('Grid names: ❎', 'Grid names: ✅'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  } else {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('Grid names: ✅', 'Grid names: ❎'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  }
}

export default toggleGridNames
