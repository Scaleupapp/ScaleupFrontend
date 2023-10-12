import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage:null,
  loading:false,
}

const sliceReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    
    setSelectedImage(state, action) {
      state.selectedImage = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },

  }
})

export const {
  setSelectedImage,
  setLoading
} = sliceReducer.actions;
export default sliceReducer.reducer;
