import { createSlice } from "@reduxjs/toolkit"

export enum LeftStatus {
  Visible = 0,
  VisibleMini = 1,
  Invisible = 2,
}

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    left: LeftStatus.Visible,
    right: false,
  },

  reducers: {
    toggleLeft: (state, { payload }) => {
      state.left = payload
    },
    toggleRight: (state) => {
      state.right = !state.right
    },
  },
})

export const { toggleLeft, toggleRight } = layoutSlice.actions

export default layoutSlice.reducer
