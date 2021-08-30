import TelegrafContext from 'telegraf/typings/context'

const start = (ctx: TelegrafContext) => {
    ctx.replyWithMarkdown(`👋 Hello! I'm the Musicorum bot. I can generate you inserir texto bonito aqui.\nTo start, please use /link to register yourself.`)
}

export default start