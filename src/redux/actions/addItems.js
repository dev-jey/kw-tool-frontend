import axios from "axios";
import {
  addModifierAction,
  addModifierSuccess,
  addModifierFailure,
  addProductAction,
  addProductSuccess,
  addProductFailure,
  addWorkflowAction,
  addWorkflowSuccess,
  addWorkflowFailure,
  getProductAction,
  getProductSuccess,
  getProductFailure,
  getWorkflowAction,
  getWorkflowSuccess,
  getWorkflowFailure
} from "../actionCreators/addItems";


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const baseUrl = `http://127.0.0.1:8000/api/v2/workflow/`
const baseUrl = `http://3.141.245.71/api/v2/workflow/`


export const addProductRequest = (products_, modifiers, workflow_id) => async (dispatch) => {
  dispatch(addProductAction());
  const products = products_.map(product => { return { "name": product.value } })
  return axios
    .post(`${baseUrl}${workflow_id}/products/`, products)
    .then((response) => {
      response.data.percentage = getRandomInt(10, 18)
      dispatch(addProductSuccess(response.data));
      dispatch(getWorkflowRequest(workflow_id, products_, modifiers))
    })
    .catch((error) => {
      dispatch(addProductFailure(error));
    });
};


// export const getProductRequest = (workflow_id, data) => async (dispatch) => {
//   dispatch(getProductAction());
//   return axios
//     .get(`${baseUrl}${workflow_id}/products/`)
//     .then((response) => {
//       dispatch(getProductSuccess(response.data));
//       response.data.forEach((item) => {
//         data.forEach((prod) => {
//           if (item.name === prod.name) {
//             prod["new_id"] = item.id
//             if (prod.modifiers) {
//               dispatch(addModifierRequest(prod, workflow_id));
//             }
//           }
//         });
//       });
//       setTimeout(() => {
//         dispatch(getWorkflowRequest(workflow_id))
//       }, 5000)
//     })
//     .catch((error) => {
//       dispatch(getProductFailure(error));
//     });
// };




export const addWorkflowRequest = (products, modifiers) => async (dispatch) => {
  dispatch(addWorkflowAction());
  return axios
    .post(`${baseUrl}`)
    .then((response) => {
      response.data.percentage = getRandomInt(6, 10)
      dispatch(addWorkflowSuccess(response.data));
      dispatch(addProductRequest(products, modifiers, response.data && response.data.id))
    })
    .catch((error) => {
      dispatch(addWorkflowFailure(error));
    });
};




export const getWorkflowRequest = (workflow_id, products, modifiers) => async (dispatch) => {
  dispatch(getWorkflowAction());
  return axios
    .get(`${baseUrl}${workflow_id}`)
    .then((response) => {
      response.data.percentage = getRandomInt(18, 30)
      dispatch(getWorkflowSuccess(response.data));
      let newMods = []
      if (modifiers.length) {
        modifiers.map(mod => {
          products.forEach(prod => {
            if (prod.id === mod.prodId) {
              mod['prodName'] = prod.value
            }
          })
          return mod
        })

        response.data.product_lines.forEach((item) => {
          modifiers.forEach((mod) => {
            if (item.name === mod.prodName) {
              mod['newProdId'] = item.id
              newMods.push(mod)
            }
          });
        });
        modifiers.forEach(mod => {
          dispatch(addModifierRequest(mod, workflow_id));
        })

        setTimeout(() => {
          dispatch(getSynonymRequest(workflow_id))
        }, 3000)
      } else {
        dispatch(getSynonymRequest(workflow_id))
      }

    })
    .catch((error) => {
      dispatch(getWorkflowFailure(error));
    });
};


export const getSynonymRequest = (workflow_id) => async (dispatch) => {
  dispatch(getWorkflowAction());
  return axios
    .get(`${baseUrl}${workflow_id}/synonymize/`)
    .then((response) => {
      response.data.percentage = getRandomInt(30, 53)
      dispatch(getWorkflowSuccess(response.data));
      dispatch(getConcatenationRequest(workflow_id))
    })
    .catch((error) => {
      dispatch(getWorkflowFailure(error));
    });
};




export const getConcatenationRequest = (workflow_id) => async (dispatch) => {
  dispatch(getWorkflowAction());
  return axios
    .get(`${baseUrl}${workflow_id}/concatenate/`)
    .then((response) => {
      response.data.percentage = getRandomInt(53, 80)
      dispatch(getWorkflowSuccess(response.data));
      dispatch(getValidatedDataRequest(workflow_id))
    })
    .catch((error) => {
      dispatch(getWorkflowFailure(error));
    });
};



export const getValidatedDataRequest = (workflow_id) => async (dispatch) => {
  dispatch(getWorkflowAction());
  return axios
    .get(`${baseUrl}${workflow_id}/first_validate/`)
    .then((response) => {
      response.data.percentage = getRandomInt(80, 100)
      dispatch(getWorkflowSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getWorkflowFailure(error));
    });
};



export const addModifierRequest = (mod, workflow_id) => async (dispatch) => {
  dispatch(addModifierAction());
  const mod_ = [mod].map(mod => { return { "name": mod.value } })
  return axios
    .post(`${baseUrl}${workflow_id}/product/${mod.newProdId}/modifiers/`, mod_)
    .then((response) => {
      response.data.percentage = 30
      dispatch(addModifierSuccess(response.data));
    })
    .catch((error) => {
      dispatch(addModifierFailure(error));
    });
};
