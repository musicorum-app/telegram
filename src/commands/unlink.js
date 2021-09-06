import { User } from '..'

const unlink = async (ctx) => {
  if (ctx.chat.type !== 'private') {
    return ctx.reply('Ooops! You can\'t use this command here.', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open private chat',
              url: 'https://telegram.me/' + ctx.botInfo.username
            }
          ]
        ]
      }
    })
  }

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
