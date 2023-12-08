import type { CategoryType } from '../category/category-type.enum';

export interface SystemCategoryDto {
  id: number;
  code?: string;
  description?: string;
  importBy?: string;
  category?: CategoryType;
}
