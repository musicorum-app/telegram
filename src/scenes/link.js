import { Scenes } from 'telegraf'
import axios from 'axios'
import { logger, User } from '../index'

export const linkingSceneName = 'SCENE_LASTFM_LINK'

export const linkingScene = new Scenes.BaseScene(linkingSceneName)

linkingScene.enter((ctx) => {
  ctx.reply('Please send me your Last.fm username.')
})

linkingScene.on('text', (ctx) => {
  if ('text' in ctx.message) {
    if (!ctx.message.text.match(/^([a-zA-Z0-9_-]{2,15})$/)) {
      return ctx.reply('Invalid username. Please try again.')
    }

    axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${ctx.message.text}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
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
    return ctx.scene.leave()
  }
})
