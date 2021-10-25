import { ADD_PRODUCT, ADD_MODIFIER, GET_PRODUCT, ADD_WORKFLOW, GET_WORKFLOW } from "../constants/index";

// Add Product Lines actions
export const addProductAction = () => ({
  type: ADD_PRODUCT,
});

export const addProductSuccess = (response) => ({
  type: `${ADD_PRODUCT}_SUCCESS`,
  response,
});

export const addProductFailure = (error) => ({
  type: `${ADD_PRODUCT}_FAILURE`,
  error,
});


// Add Product Lines actions
export const getProductAction = () => ({
  type: GET_PRODUCT,
});

export const getProductSuccess = (response) => ({
  type: `${GET_PRODUCT}_SUCCESS`,
  response,
  percentage: response.percentage
});

export const getProductFailure = (error) => ({
  type: `${GET_PRODUCT}_FAILURE`,
  error,
});


// Add Modifier actions
export const addModifierAction = () => ({
  type: ADD_MODIFIER,
});

export const addModifierSuccess = (response) => ({
  type: `${ADD_MODIFIER}_SUCCESS`,
  response,
  percentage: response.percentage
});

export const addModifierFailure = (error) => ({
  type: `${ADD_MODIFIER}_FAILURE`,
  error,
});




// Add Workflow actions
export const addWorkflowAction = () => ({
  type: ADD_WORKFLOW,
});

export const addWorkflowSuccess = (response) => ({
  type: `${ADD_WORKFLOW}_SUCCESS`,
  response,
  percentage: response.percentage
});

export const addWorkflowFailure = (error) => ({
  type: `${ADD_WORKFLOW}_FAILURE`,
  error,
});




// Get Workflow actions
export const getWorkflowAction = () => ({
  type: GET_WORKFLOW,
});

export const getWorkflowSuccess = (response) => ({
  type: `${GET_WORKFLOW}_SUCCESS`,
  response,
  percentage: response.percentage
});

export const getWorkflowFailure = (error) => ({
  type: `${GET_WORKFLOW}_FAILURE`,
  error,
});



