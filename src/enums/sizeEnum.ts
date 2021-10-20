/*
 * @Author: withering 
 * @Date: 2021-10-20 18:13:45 
 * @Last Modified by:   withering 
 * @Last Modified time: 2021-10-20 18:13:45 
 */
export enum SizeEnum {
  DEFAULT = 'default',
  SMALL = 'small',
  LARGE = 'large',
}

export enum SizeNumberEnum {
  DEFAULT = 48,
  SMALL = 16,
  LARGE = 64,
}

export const sizeMap: Map<SizeEnum, SizeNumberEnum> = (() => {
  const map = new Map<SizeEnum, SizeNumberEnum>();
  map.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT);
  map.set(SizeEnum.SMALL, SizeNumberEnum.SMALL);
  map.set(SizeEnum.LARGE, SizeNumberEnum.LARGE);
  return map;
})();
