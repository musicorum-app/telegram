import { Signale } from 'signale'
import { Scenes, Telegraf, session } from 'telegraf'
import start from './commands/start'
import { linkingScene, linkingSceneName } from './scenes/link'

const logger = new Signale({ scope: 'MusicorumBot' })

logger.addSecrets([process.env.TELEGRAM_TOKEN])
logger.info('Starting bot')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

// TODO: Use another session provider
bot.use(session())

const stage = new Scenes.Stage([linkingScene])
bot.use(stage.middleware())

bot.start(start)

bot.command('link', (ctx) => ctx.scene.enter(linkingSceneName))

bot.launch()
  .then(() => logger.info('Bot running as @%s', bot.botInfo.username))
  .catch(e => logger.error(e))
