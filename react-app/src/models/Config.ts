/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */

type TooglePropKeys = {
   isShuffling: boolean
}

type PropKeys = {
  playingMode: number
  volume: number
}

export class Config {
  @observable isShuffling = false
  @observable playingMode = 0
  @observable volume = 0

  @action
  toogle(prop: keyof TooglePropKeys) {
    this[prop] = !this[prop]
  }

  @action
  set(tuple: [keyof PropKeys, any]) {
    const [k, v] = tuple
    this[k] = v
  }

  constructor() {
    makeObservable(this)
  }
}
