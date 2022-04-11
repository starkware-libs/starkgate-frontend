import envs from '../../config/envs';
import utils from '../../utils';

const {localStorageAcceptTermsKey} = envs;

export const actions = {
  SET_ACCEPT_TERMS: 'App/SET_ACCEPT_TERMS',
  SET_IS_LOGGED_IN: 'App/SET_IS_LOGGED_IN'
};

export const initialState = {
  isAcceptTerms: utils.storage.getItem(localStorageAcceptTermsKey),
  isLoggedIn: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ACCEPT_TERMS: {
      return {
        ...state,
        isAcceptTerms: true
      };
    }

    case actions.SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    }

    default:
      return state;
  }
};