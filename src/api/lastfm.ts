import fetch from 'node-fetch'

const LASTFM_API = 'https://ws.audioscrobbler.com/2.0/'

export interface UserProfile {
  realname?: string,
  name: string,
  registered: LastfmDate,
  image: ImagesObject
}

export interface LastfmDate {
  unixtime: string,
  '#text': number
}

export interface ImagesObject {
  [index: number]: {
    size: string,
    '#text'?: string
  }
}

export default class API {
  static async request(method: string, params: Record<string, any>): Promise<Record<string, any>> {
    params.api_key = process.env.LASTFM_KEY
    params.format = 'json'
    params.method = method
    const queryParams = new URLSearchParams(params)
    return fetch(`${LASTFM_API}?${queryParams}`).then(r => r.json())
  }

  static async userGetInfo(user: string): Promise<UserProfile> {
    return API.request('user.getInfo', {
      user
    }).then(r => r.user)
  }
}
