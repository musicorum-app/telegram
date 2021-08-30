import Context from 'telegraf/typings/context'

const link = (ctx: Context) =>{
    if (!ctx.message.text) {
        return ctx.reply("Command usage: /link <username>")
    }
}

export default link