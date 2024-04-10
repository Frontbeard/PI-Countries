import {
  GET_COUNTRIES,
  POST_ACTIVITY,
  GET_ACTIVITIES,
} from "./actionsType";

const initialState = {
  countries: [],
  currentPage: 1,
  totalPages: 0,
  activities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        ...action.payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
