import { Sequelize, DataTypes } from 'sequelize'
import { Signale } from 'signale'
import link from './commands/link'
import start from './commands/start'
import { linkingScene } from './scenes/link'
import { gridScene } from './scenes/gridSizeInput'
import { Telegraf, Scenes, session } from 'telegraf'
import unlink from './commands/unlink'
import generate from './commands/generate'
import duotoneStep from './actions/duotone/duotoneWizard'
import toggleStoryMode from './actions/toggleStoryMode'
import create from './actions/generate'
import back from './actions/back'
import gridStep from './actions/grid/gridWizard'
import toggleGridNames from './actions/grid/toggleGridNames'
import toggleGridPlaycount from './actions/grid/toggleGridPlaycount'

export const logger = new Signale({ scope: 'MusicorumBot' })
const wizards = new Map()

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
const stage = new Scenes.Stage([linkingScene, gridScene])

bot.use(session())
bot.use(stage.middleware())
bot.context.wizards = wizards

bot.command('link', async (ctx) => await link(ctx))
bot.command('start', (ctx) => start(ctx))
bot.command('unlink', async (ctx) => await unlink(ctx))
bot.command('generate', async (ctx) => await generate(ctx))

bot.action('duotone', (ctx) => duotoneStep.top(ctx))
bot.action('grid', (ctx) => gridStep.top(ctx))

bot.action(['artists', 'tracks', 'albums'], (ctx) => {
  if (wizards[ctx.from.id].theme === 'duotone') {
    duotoneStep.period(ctx)
  } else if (wizards[ctx.from.id].theme === 'grid') {
    gridStep.size(ctx)
  }
})
bot.action(['7day', '1month', '3month', '6month', '12month', 'overall'], (ctx) => {
  if (wizards[ctx.from.id].theme === 'duotone') {
    duotoneStep.palette(ctx)
  } else if (wizards[ctx.from.id].theme === 'grid') {
    gridStep.confirm(ctx)
  }
})
bot.action(['purplish', 'natural', 'divergent', 'sun', 'yellish', 'horror', 'sea'], (ctx) => duotoneStep.confirm(ctx))
bot.action('stories_mode', (ctx) => toggleStoryMode(ctx))
bot.action('generate', async ctx => await create(ctx))
bot.action('back', async (ctx) => await back(ctx))
bot.action('grid_toggle_names', (ctx) => toggleGridNames(ctx))
bot.action('grid_toggle_playcount', (ctx) => toggleGridPlaycount(ctx))

bot.launch().then(() => {
  logger.info(`Logged in as @${bot.botInfo.username}`)
})
