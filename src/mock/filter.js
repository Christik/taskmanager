import { FilterType } from '../const.js';
import { getRandomInteger } from '../utils/common.js';

export const generateFilter = () => Object.values(FilterType).map((name) => ({
  name,
  count: getRandomInteger(0, 5),
}));
