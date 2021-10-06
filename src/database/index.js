import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize(process.env.POSTGRE_URL)

export function sync (logger) {
  logger.info('Connecting to database')
  sequelize.sync().then(() => logger.info('Database has been synced'))
}

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
