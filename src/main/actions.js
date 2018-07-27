import { ADD_ITEM, REMOVE_ITEM } from './constants';

export function addItem(content) {
  return { type: ADD_ITEM, content };
}

export function removeItem(content) {
  return { type: REMOVE_ITEM, content };
}
