import { types } from "mobx-state-tree"

const app = types.model("app", {}).actions((self) => ({
  // toogle(k: keyof TooglePropKeys) {
  //   self[k] = !self[k]
  // },
  // set(tuple: [keyof PropKeys, number | string]) {
  //   const [k, v] = tuple
  //   Object.assign(self, {
  //     [k]: v,
  //   })
  // },
}))

export default app
