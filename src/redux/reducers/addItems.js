import { ADD_PRODUCT, ADD_MODIFIER, GET_PRODUCT, ADD_WORKFLOW, GET_WORKFLOW } from "../constants/index";

const initialState = {
  data: [],
  isLoading: false,
  isSuccessFul: false,
  error: null,
  percentage: 0,
};


const addItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${ADD_PRODUCT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: true,
        data: action.response,
        percentage: action.percentage,
        error: null,
      };
    case `${ADD_PRODUCT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: false,
        error: action.error,
      };

    case ADD_MODIFIER:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${ADD_MODIFIER}_SUCCESS`:
      return {
        ...state,
        isLoading: true,
        isSuccessFul: true,
        data: action.response,
        percentage: action.percentage,
        error: null,
      };
    case `${ADD_MODIFIER}_FAILURE`:
      return {
        ...state,
        isLoading: true,
        isSuccessFul: false,
        error: action.error,
      };

    case ADD_WORKFLOW:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${ADD_WORKFLOW}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: true,
        data: action.response,
        error: null,
      };
    case `${ADD_WORKFLOW}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: false,
        error: action.error,
      };

    case GET_WORKFLOW:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${GET_WORKFLOW}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: true,
        data: action.response,
        percentage: action.percentage,
        error: null,
      };
    case `${GET_WORKFLOW}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: false,
        error: action.error,
      };
    case GET_PRODUCT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${GET_PRODUCT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: true,
        data: action.response,
        error: null,
      };
    case `${GET_PRODUCT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        isSuccessFul: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default addItemsReducer;
