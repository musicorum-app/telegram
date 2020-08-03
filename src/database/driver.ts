import {DatabaseUser, Nullable, PresetDocument} from "../types";
import User from "./schemas/User";
import winston from "winston";
import {connect} from "mongoose";
import logger from "../utils/logger";
import Preset from "./schemas/Preset";

export async function connectDatabase() {
  logger.info('Connecting to the database...')
  await connect(process.env.MONGO_URI!, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      logger.info('Successfully connected to database!')
    })
    .catch(e => {
      logger.error('Error while connecting to the database:')
      logger.error(e)
    })
}

export async function findUser(telegramId: string): Promise<Nullable<DatabaseUser>> {
  return User.findOne({telegram: telegramId})
}

export async function defineUser(telegramId: string, lastfmUser: string): Promise<void> {
  const result = await User.findOne({telegram: telegramId})
  if (result) {
    result.lastfm = lastfmUser
    await result.save()
  } else {
    const doc = new User({
      telegram: telegramId,
      lastfm: lastfmUser
    })
    await doc.save()
  }
}

export async function getPreset(code: string): Promise<Nullable<PresetDocument>> {
  return Preset.findOne({code})
}
