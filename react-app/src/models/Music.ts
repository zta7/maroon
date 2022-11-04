interface TooglePropKeys {
  readonly isLiked: string
  readonly isPlaying: string
}

export class Music {
  id = `${Math.random()}`
  title = 'Blank Account Long Long Long Long Long'
  album = 'Issa Album'
  artists = ['21 Savage', 'adsasd']
  during = 100000
  currentTime = 1000
  finished = false

  @observable isLiked = false
  @observable isPlaying = false

  @action
  toogle(prop: keyof TooglePropKeys) {
    this[prop] = !this[prop]
  }

  constructor() {
    makeObservable(this)
  }
}
