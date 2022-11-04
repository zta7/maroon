/* eslint-disable no-param-reassign */
import { createContext } from 'react'
import App from './app'

const app = App.create()

export const rootStore = {
  app,
}

export const rootContext = createContext<any>(null)
