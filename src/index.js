import { Sequelize, DataTypes } from 'sequelize'
import { Signale } from 'signale'
import link from './commands/link'
import start from './commands/start'
import { linkingScene } from './scenes/link'
import { Telegraf, Scenes, session } from 'telegraf'
import unlink from './commands/unlink'
import generate from './commands/generate'
import duotoneStep from './actions/duotoneStep'
import axios from 'axios'
import FormData from 'form-data'

export const logger = new Signale({ scope: 'MusicorumBot' })
export const wizards = new Map()

logger.info('Connecting to database')
export const sequelize = new Sequelize(process.env.POSTGRE_URL)
sequelize.sync().then(() => logger.info('Database has been synced'))

logger.addSecrets([process.env.TELEGRAM_TOKEN])

export const User = sequelize.define('user', {
  telegram_id: {
    allowNull: false,
    type: DataTypes.STRING(16),
    primaryKey: true
  },
  lastfm: {
    allowNull: false,
    type: DataTypes.STRING(15)
  }
})

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
const stage = new Scenes.Stage([linkingScene])

bot.use(session())
bot.use(stage.middleware())

bot.command('link', async (ctx) => await link(ctx))
bot.command('start', (ctx) => start(ctx))
bot.command('unlink', async (ctx) => await unlink(ctx))
bot.command('generate', (ctx) => generate(ctx))

bot.action('duotone', (ctx) => duotoneStep.top(ctx))
bot.action(['artists', 'tracks', 'albuns'], (ctx) => {
  if (wizards[ctx.from.id].theme === 'duotone') {
    duotoneStep.period(ctx)
  }
})
bot.action(['7day', '1month', '3month', '6month', '12month', 'overall'], (ctx) => {
  if (wizards[ctx.from.id].theme === 'duotone') {
    duotoneStep.palette(ctx)
  }
})
bot.action(['purplish', 'natural', 'divergent', 'sun', 'yellish', 'horror', 'sea'], (ctx) => duotoneStep.confirm(ctx))

bot.action('generate', async ctx => {
  ctx.editMessageText('⏱️ Please hold...')
  const wizard = wizards[ctx.from.id]
  const user = await User.findByPk(ctx.from.id.toString())

  wizard.body.options.user = user.lastfm
  try {
    const req = await wizard.generate()
    const buffer = Buffer.from(req.data.base64.replace('data:image/jpeg;base64,', ''), 'base64')
    // const form = new FormData()
    // //  form.append('chat_id', ctx.from.id)
    // form.append('photo', buffer)
    // /* form.append('reply_markup', JSON.stringify({
    //   inline_keyboard: [
    //     [
    //       {
    //         text: 'Save this preset',
    //         callback_data: '0'
    //       }
    //     ]
    //   ]
    // })
    // ) */

    // axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPhoto?chat_id=${ctx.chat.id}`, form, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    //   .then(r => console.log(r))
    //   .catch(r => console.log(r))

    ctx.replyWithPhoto({ source: buffer })
  } catch (e) {
    ctx.editMessageText('❌ An error ocurred.')
    console.log(e)
  }
})

bot.launch().then(() => {
  logger.info(`Logged in as @${bot.botInfo.username}`)
})
