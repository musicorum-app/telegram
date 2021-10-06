import { logger } from '../index'
import { linkingSceneName } from '../scenes/link'
import axios from 'axios'
import { User } from '../database'

const link = async (ctx) => {
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

  const args = ctx.message.text.split(' ')

  const user = await User.findByPk(ctx.chat.id.toString())
  if (user !== null) {
    return ctx.reply('You\'re already registered. If you\'re looking to change your username, use /unlink and /link again.')
  }

  if (!args[1]) {
    ctx.scene.enter(linkingSceneName)
  } else {
    if (!args[1].match(/^([a-zA-Z0-9_-]{2,15})$/)) {
      return ctx.reply('Invalid username. Please try again.')
    }

    axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${args[1]}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
      .then(async (r) => {
        await User.create({
          lastfm: r.data.user.name,
          telegram_id: ctx.chat.id
        })
        ctx.replyWithMarkdown(`Got it! *${r.data.user.name}* is now your linked Last.fm user.`)
      })
      .catch(err => {
        if (err.response?.status === 404) {
          return ctx.reply('Invalid username. Please try again.')
        } else {
          logger.error(err)
          return ctx.reply('An error ocurred, please try again in a few minutes.')
        }
      })
  }
}

export default link
