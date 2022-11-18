import { createSlice } from "@reduxjs/toolkit"

export enum LeftStatus {
  Visible = 0,
  VisibleMini = 1,
  Invisible = 2,
}

export enum RightStatus {
  Comment = 0,
  Update = 1,
  Invisible = 2,
}

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    left: LeftStatus.Visible,
    right: RightStatus.Invisible,
    favourite: false,
  },

  reducers: {
    toggleLeft: (state, { payload }) => {
      state.left = payload
    },
    toggleRight: (state, { payload }) => {
      state.right = payload
    },
    toggleFavourite: (state) => {
      state.favourite = !state.favourite
    },
  },
})

export const { toggleLeft, toggleRight, toggleFavourite } = layoutSlice.actions

export default layoutSlice.reducer
