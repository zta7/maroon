/* eslint-disable no-param-reassign */
import {
  types,
} from 'mobx-state-tree'

type PropKeys = {
  scrollTop: number
}

const page = types
  .model('page', {
    scrollTop: 0,
  })
  .actions((self) => ({
    set(tuple: [keyof PropKeys, number | string]) {
      const [k, v] = tuple
      Object.assign(self, {
        [k]: v,
      })
    },
  }))

export default page
