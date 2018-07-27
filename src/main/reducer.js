import { ADD_ITEM, REMOVE_ITEM } from './constants';
import { getInitialState } from './state';

const reducer = (state = getInitialState(), action) => {
  let oldCountries = state.countries;
  let newCountries;
  let countryIndex;

  switch (action.type) {
    case ADD_ITEM:
      countryIndex = state.countries.findIndex(({ countryCode }) => countryCode === action.content.countryCode);

      if (countryIndex === -1) {
          oldCountries = state.countries;
          newCountries = [
              ...oldCountries,
              { ...action.content }
          ];

          return Object.assign({}, state, {
              countries: newCountries
          });
      }

    case REMOVE_ITEM:
      countryIndex = state.countries.findIndex(({ countryCode }) => countryCode === action.content.countryCode);
      newCountries = [
        ...oldCountries.slice(0, countryIndex),
        ...oldCountries.slice(countryIndex + 1)
      ];

      return Object.assign({}, state, {
          countries: newCountries
      });

    default:
      return state;
  }
};

export default reducer;
