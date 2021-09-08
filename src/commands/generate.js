import { User } from '..'

const generate = (ctx) => {
  const args = ctx.message.text.split(' ')
  const user = await User.findByPk(ctx.from.id)

  if (!user) {
    return ctx.reply('You haven\'t linked your Last.fm account! Use /link to do so.')
  }

  if (!args[1]) {
    ctx.replyWithMarkdown('Welcome to the Chart Generator Wizard 🧙‍♂️\n\nSelect a theme', {
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
    })
  }
}

export default generate
