import { wizards } from '..'

const toggleStoryMode = (ctx) => {
  const storyMode = wizards[ctx.from.id].body.options.story
  wizards[ctx.from.id].body.options.story = !storyMode

  if (storyMode) {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('✔️', '❌'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  } else {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('❌', '✔️'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  }
}

export default toggleStoryMode
