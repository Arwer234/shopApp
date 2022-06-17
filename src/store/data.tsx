import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shop_items:[
        {id:0, title:"Sample 1", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:1, title:"Sample 2", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:2, title:"Sample 3", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:3, title:"Sample 4", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:4, title:"Sample 5", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:5, title:"Sample 6", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:6, title:"Sample 7", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
        {id:7, title:"Sample 8", desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
    ]
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {}
});

export default dataSlice