import { mapEnumToOptions } from '@abp/ng.core';

export enum CategoryType {
  LegalEntity = 0,
  Department = 1,
  ExpenseCode = 2,
}

export const categoryTypeOptions = mapEnumToOptions(CategoryType);
