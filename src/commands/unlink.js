import { User } from '..'

const unlink = async (ctx) => {
  const user = await User.findByPk(ctx.chat.id.toString())
  if (!user) {
    return ctx.replyWithMarkdown('You haven\'t registered yourself yet. Use /link to do so.')
  }

  User.destroy({
    where: {
      telegram_id: ctx.chat.id.toString()
    }
  }).then(() => {
    return ctx.replyWithMarkdown(`You account _${user.lastfm}_ has been successfully unlinked.`)
  })
}

export default unlink
