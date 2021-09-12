import { User } from '..'

const generate = async (ctx, edit = false) => {
  const user = await User.findByPk(ctx.from.id.toString())

  if (!user) {
    return ctx.reply('You haven\'t linked your Last.fm account! Use /link to do so.')
  }

  const replyMarkup = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Grid',
            callback_data: 'grid'
          },
          {
            text: 'Duotone',
            callback_data: 'duotone'
          }
        ]
      ]
    }
  }

  if (edit) {
    ctx.editMessageText('Welcome to the Chart Generator Wizard 🧙‍♂️\n\nSelect a theme', replyMarkup)
  } else {
    ctx.replyWithMarkdown('Welcome to the Chart Generator Wizard 🧙‍♂️\n\nSelect a theme', replyMarkup)
  }
}

export default generate
