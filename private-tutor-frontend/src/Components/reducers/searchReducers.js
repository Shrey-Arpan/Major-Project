
import { GET_SEARCH_RESULTS } from "../search/actions/types";


const initialState = {
    searchResults:[],
  };
  console.log(action.payload); 


const searchReducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_SEARCH_RESULTS:
       
        return {
          ...state,
          searchResults: action.payload,
        };
      default:
        console.log("he")
        return state;
    }
  };
  
  export default searchReducers;


  // export default function (state = initialState, action) {
//     switch (action.type) {
//       case GET_SEARCH_RESULTS:
//         return {
//           ...state,
//           searchResults: action.payload,
//         };
//       default:
//         return state;
//     }
//   };