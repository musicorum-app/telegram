import {TelegrafContext} from 'telegraf/typings/context'
import {SceneContextMessageUpdate} from "telegraf/typings/stage";
import userSetupScene from "../scenes/userSetup";
import {Markup} from "telegraf";

export default (ctx: SceneContextMessageUpdate) => {
  ctx.reply('Choose a theme to generate', Markup.keyboard([
      ['Grid', 'Duotone'],
      ['Tops']
    ])
      .oneTime()
      .resize()
      .extra()
  )
}
