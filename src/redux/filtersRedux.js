/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// TODO - add other action types
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
export const CHANGE_TAG = createActionName('CHANGE_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');

// action creators
export const changeSearchPhrase = data => ({ data, type: CHANGE_PHRASE });
// TODO - add other action creators
export const changeDuration = data => ({ data, type: CHANGE_DURATION });
export const changeTag = data => ({ data, type: CHANGE_TAG });

// reducer
export default function reducer(statePart = {}, action = {}) {
  console.log(action);
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.data,
      };
      // TODO - handle other action types
    case CHANGE_DURATION:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          ...action.data,
        },
      };
    case CHANGE_TAG:
      return {
        ...statePart,
        tags:action.data,
      };
    default:
      return statePart;
  }
}
