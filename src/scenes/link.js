import { Scenes } from 'telegraf'

export const linkingSceneName = 'SCENE_LASTFM_LINK'

export const linkingScene = new Scenes.BaseScene(
  linkingSceneName
)

linkingScene.enter((ctx) => { // Start
  ctx.reply('Please send me your Lastfm username!')
})

linkingScene.on('text', (ctx) => { // Validation
  if ('text' in ctx.message) {
    if (!ctx.message.text.match(/^([a-zA-Z0-9_-]{2,15})$/)) {
      return ctx.reply('Please send me a valid username!')
    }

    ctx.reply(`Welcome ${ctx.message.text}!`)
    return ctx.scene.leave()
  }
})
