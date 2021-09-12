import { wizards } from '../..'

const toggleGridPlaycount = (ctx) => {
  if (!wizards[ctx.from.id]) return ctx.editMessageText('❌ Try again')
  const playcount = wizards.wizards[ctx.from.id].body.options.playcount
  wizards[ctx.from.id].body.options.playcount = !playcount

  if (playcount) {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('Grid playcount: ✅', 'Grid playcount: ❎'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  } else {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('Grid playcount: ❎', 'Grid playcount: ✅'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  }
}

export default toggleGridPlaycount
