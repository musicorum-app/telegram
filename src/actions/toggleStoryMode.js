import { wizards } from '..'

const toggleStoryMode = (ctx) => {
  if (!wizards[ctx.from.id]) return ctx.editMessageText('❌ Try again')
  const storyMode = wizards.wizards[ctx.from.id].body.options.story
  wizards[ctx.from.id].body.options.story = !storyMode

  if (storyMode) {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('Story mode: ✅', 'Story mode: ❎'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  } else {
    ctx.editMessageText(ctx.callbackQuery.message.text.replace('Story mode: ❎', 'Story mode: ✅'), {
      reply_markup: ctx.callbackQuery.message.reply_markup
    })
  }
}

export default toggleStoryMode
