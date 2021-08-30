import { FETCH_API } from "../utils/constants";

export const types = {
  STORE_DATA: "start_fetch",
  SHOW_LOADER: "show_loader",
  HIDE_LOADER: "hide_loader",
};

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case types.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case types.HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const actions = {
  getData: () => (dispatch) => {
    dispatch({ type: types.SHOW_LOADER });
    fetch(FETCH_API)
      .then((res) => res.json())
      .then((response) => {
        dispatch({ type: types.HIDE_LOADER });
        dispatch({ type: types.STORE_DATA, payload: { data: response.data } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: types.HIDE_LOADER });
      });
  },
};
