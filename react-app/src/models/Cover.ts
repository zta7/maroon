export class Cover {
  id = Math.random()
  title = ''
  imgUrl = ''

  constructor(fields: Partial<Cover>) {
    Object.assign(this, fields)
  }
}
