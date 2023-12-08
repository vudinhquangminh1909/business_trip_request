import type { CategoryType } from './category-type.enum';
import type { CreateUpdateCategoryDTO } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SystemCategoryDto } from '../base-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class SystemCategoryService {
  apiName = 'Default';
  

  createList = (input: CreateUpdateCategoryDTO, category: CategoryType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/system-category/list',
      params: { category },
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteList = (id: number, category: CategoryType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/system-category/${id}/list`,
      params: { category },
    },
    { apiName: this.apiName,...config });
  

  getList = (category: CategoryType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SystemCategoryDto[]>({
      method: 'GET',
      url: '/api/app/system-category',
      params: { category },
    },
    { apiName: this.apiName,...config });
  

  getListId = (id: number, category: CategoryType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SystemCategoryDto[]>({
      method: 'GET',
      url: `/api/app/system-category/${id}/id`,
      params: { category },
    },
    { apiName: this.apiName,...config });
  

  getListWhere = (category: CategoryType, stringSearch: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SystemCategoryDto[]>({
      method: 'GET',
      url: '/api/app/system-category/where',
      params: { category, stringSearch },
    },
    { apiName: this.apiName,...config });
  

  updateList = (id: number, input: CreateUpdateCategoryDTO, category: CategoryType, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: `/api/app/system-category/${id}/list`,
      params: { category },
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
