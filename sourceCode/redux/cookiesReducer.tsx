import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginUser: {},
  allUsersDetail:{},
  login:false
};

const cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    setLoginUser: (state, action) =>{
      console.log("userDetails---->",  state.loginUser)
      state.loginUser = action.payload
    },
    setAllUserDetail: (state, action) =>{
      console.log("userDetails---->",  state.allUsersDetail)
      state.allUsersDetail = action.payload
    },
    setLogin: (state, action) =>{
      state.login = action.payload
    },

    
  },
});

export const {setLoginUser,setAllUserDetail,setLogin} = cookies.actions;
export default cookies.reducer;