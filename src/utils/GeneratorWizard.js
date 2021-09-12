import axios from 'axios'
import strings from '../strings.json'

export default class GeneratorWizard {
  constructor (theme) {
    this.body = {
      options: {
        story: false,
        messages: {}
      },
      source: process.env.SOURCE
    }
    this.theme = theme
    this.step = 1
  }

  async generate () {
    this.body.theme = this.theme
    this.body.options.messages.title = strings.themes.duotone.titles[this.body.options.top]
    this.body.options.messages.subtitle = strings.themes.duotone.periods[this.body.options.period]
    this.body.options.messages.scrobbles = ['scrobbles', strings.themes.duotone.periods[this.body.options.period]]
    return axios.post('https://generator.musicorumapp.com/generate', this.body)
  }
}
