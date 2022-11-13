import { types } from "mobx-state-tree"

type PropKeys = {
  mainWidth: number
}

const app = types
  .model("app", {
    leftDrawerWidth: 200,
    rightDrawerWidth: 400,
    mainWidth: 200,
  })
  .actions((self) => ({
    // toogle(k: keyof TooglePropKeys) {
    //   self[k] = !self[k]
    // },
    set(tuple: [keyof PropKeys, number]) {
      const [k, v] = tuple
      self[k] = v
    },
  }))

export default app
