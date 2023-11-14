import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage:null,
  loading:false,
  pofileData:[],
  other:''
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
    setProfileDat(state, action) {
      state.pofileData = action.payload
    },
    setOther(state, action) {
      state.other = action.payload
    },


  }
})

export const {
  setSelectedImage,
  setLoading,
  setProfileDat,
  setOther
} = sliceReducer.actions;
export default sliceReducer.reducer;
