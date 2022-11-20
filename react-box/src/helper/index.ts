import { cloneDeep } from "lodash"

export const findClosest = (arr: Array<number>, target: number) => {
  return arr.reduce((a, b) => {
    return Math.abs(b - target) < Math.abs(a - target) ? b : a
  })
}

export const findClosestIndex = (arr: Array<number>, target: number) => {
  const _ = arr.reduce((a, b) => {
    return Math.abs(b - target) < Math.abs(a - target) ? b : a
  })
  return arr.findIndex((e) => e === _)
}

export const swap = (array: Array<any>, i1: number, i2: number) => {
  const tmp = array[i1]
  array[i1] = array[i2]
  array[i2] = tmp
  return array
}
