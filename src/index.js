const Sentry = require('@sentry/node')
Sentry.init({dsn: process.env.SENTRY_DSN})

const { Telegraf } = require('telegraf')
const RedisSession = require('telegraf-session-redis')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage

const bot = new Telegraf(process.env.BOT_TOKEN)

const session = new RedisSession({
  store: {
    host: process.env.TELEGRAM_SESSION_HOST || 'redis',
    port: process.env.TELEGRAM_SESSION_PORT || 6379
  }
})

const stage = new Stage()
stage.command('cancel', leave())

bot.use(session)
bot.use(stage.middleware())

const setUsername = new Scene('setUsername')
setUsername.enter(ctx => ctx.reply('What\'s your LastFM username?'))
setUsername.on('message', ctx => {
  const username = ctx.message.text.split(' ')[0]
  ctx.session.username = username
  ctx.reply(`Saved your username as **${username}**.`)
  leave()
})
stage.register(setUsername)
bot.command('setusername', ctx => ctx.scene.enter('setUsername'))

bot.launch()