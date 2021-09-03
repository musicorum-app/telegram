import { Sequelize, DataTypes } from 'sequelize'
import { Signale } from 'signale'
import link from './commands/link'
import start from './commands/start'
import { linkingScene } from './scenes/link'
import { Telegraf, Scenes, session } from 'telegraf'
import unlink from './commands/unlink'

export const logger = new Signale({ scope: 'MusicorumBot' })

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

bot.launch().then(() => {
  logger.info(`Logged in as @${bot.botInfo.username}`)
})
