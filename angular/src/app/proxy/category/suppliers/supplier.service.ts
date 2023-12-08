import type { CreateUpdateSupplierDto, SupplierDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  apiName = 'Default';
  

  createList = (input: CreateUpdateSupplierDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/supplier/list',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteList = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/supplier/${id}/list`,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SupplierDto[]>({
      method: 'GET',
      url: '/api/app/supplier',
    },
    { apiName: this.apiName,...config });
  

  getListId = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SupplierDto[]>({
      method: 'GET',
      url: `/api/app/supplier/${id}/id`,
    },
    { apiName: this.apiName,...config });
  

  getListWhere = (intSearch: number, stringSearch: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SupplierDto[]>({
      method: 'GET',
      url: '/api/app/supplier/where',
      params: { intSearch, stringSearch },
    },
    { apiName: this.apiName,...config });
  

  updateList = (id: number, input: CreateUpdateSupplierDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: `/api/app/supplier/${id}/list`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
