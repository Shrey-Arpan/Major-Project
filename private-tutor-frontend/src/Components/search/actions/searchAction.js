    import axios from "axios";

    import { GET_SEARCH_RESULTS} from "./types";

    export const searchUser = (userSearch, history) => async (dispatch) => {
        try {
        const response = await axios.post("/api/search/findUsers", userSearch);    
        const { data } = response;
        console.log(data);
        dispatch({
            type: GET_SEARCH_RESULTS,
            payload: data,
        });
        console.log("working")
        history.push("/search-results");

        } catch (error) {
        console.error("Error searching users:", error);
        }
    };


