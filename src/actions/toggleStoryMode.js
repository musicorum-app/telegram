// TODO: Fix for duotone theme
// This function has been changed to use the optionsMessageFactory on the grid theme,
// something that the duotone theme currently doesn't have.

const toggleStoryMode = (ctx) => {
  const wizard = ctx.wizards[ctx.from.id]
  if (!wizard) return ctx.editMessageText('❌ Try again')
  const options = wizard.body.options
  options.story = !options.story

  ctx.editMessageText(wizard.createMessage(options), {
    reply_markup: ctx.callbackQuery.message.reply_markup
  })
}

export default toggleStoryMode
