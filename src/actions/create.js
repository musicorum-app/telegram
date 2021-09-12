import { User, wizards } from '..'

const create = async (ctx) => {
  ctx.editMessageText('⏱️ Please hold...')
  const wizard = wizards[ctx.from.id]
  const user = await User.findByPk(ctx.from.id.toString())

  wizard.body.options.user = user.lastfm
  try {
    const req = await wizard.generate()
    const buffer = Buffer.from(req.data.base64.replace('data:image/jpeg;base64,', ''), 'base64')
    ctx.replyWithPhoto({ source: buffer })
  } catch (e) {
    ctx.editMessageText('❌ An error ocurred.')
    console.log(e)
  }
}

export default create
