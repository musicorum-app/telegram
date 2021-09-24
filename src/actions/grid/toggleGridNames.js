const toggleGridNames = (ctx) => {
  const wizard = ctx.wizards[ctx.from.id]
  if (!wizard) return ctx.editMessageText('❌ Try again')
  const options = wizard.body.options
  options.names = !options.names

  ctx.editMessageText(wizard.createMessage(options), {
    reply_markup: ctx.callbackQuery.message.reply_markup
  })
}

export default toggleGridNames
