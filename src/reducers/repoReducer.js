import { GET_REPOSITORIES_SUCCESS } from "../actions/actionTypes";

const initialState = {
  repositoriesList: []
};

export const repoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOSITORIES_SUCCESS:
      return { ...state, repositoriesList: action.payload };
  }
  return state
} 