export class GenricList {
  id = Math.random()
  title = ''
  subtitle = ''
  imgUrl = ''

  @observable isPlaying = false

  @action
  play() {
    this.isPlaying = true
  }

  @action
  pause() {
    this.isPlaying = false
  }

  constructor(fields: Partial<GenricList>) {
    Object.assign(this, fields)
    makeObservable(this)
  }
}
