import { TelegrafContext } from 'telegraf/typings/context'
import {SceneContextMessageUpdate} from "telegraf/typings/stage";
import userSetupScene from "../scenes/userSetup";

export default (ctx: SceneContextMessageUpdate) => {
  ctx.replyWithMarkdown(`*Welcome to the Musicorum Telegram Bot!*
  
Here i can generate to you some fancy images from [Last.fm](https://last.fm/) from the [Musicorum Generator](https://musicorumapp.com/generate).
  
To start using me, please send me your Last.fm username`)
  ctx.scene.enter(userSetupScene.name)
}
