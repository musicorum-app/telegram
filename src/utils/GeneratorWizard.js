import axios from 'axios'
import { logger } from '..'

export default class GeneratorWizard {
  constructor(theme) {
    this.body = {
      options: {
        messages: {}
      }
    }
    this.theme = theme
  }

  // TODO someone fix this method pls
  async generate() {
    this.body.theme = this.theme
    this.body.options.messages.title = 'MOST LISTENED' + this.body.options.period.toUpperCase()
    this.body.options.messages.subtitle = 'all my friends are witches'
    this.body.options.messages.scrobbles = ['scrobbles', '30 days']
    this.body.options.story = false
    this.body.source = 'telegram-dev'
    return axios.post('https://generator.musicorumapp.com/generate', this.body)
  }
}
