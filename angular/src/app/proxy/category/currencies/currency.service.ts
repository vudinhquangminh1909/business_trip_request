import type { CreateUpdateCurrencyDTO, CurrencyDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiName = 'Default';
  

  createList = (input: CreateUpdateCurrencyDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/currency/list',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteList = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/currency/${id}/list`,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto[]>({
      method: 'GET',
      url: '/api/app/currency',
    },
    { apiName: this.apiName,...config });
  

  getListId = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto[]>({
      method: 'GET',
      url: `/api/app/currency/${id}/id`,
    },
    { apiName: this.apiName,...config });
  

  getListWhere = (floatSearch: number, stringSearch: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto[]>({
      method: 'GET',
      url: '/api/app/currency/where',
      params: { floatSearch, stringSearch },
    },
    { apiName: this.apiName,...config });
  

  updateList = (id: number, input: CreateUpdateCurrencyDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: `/api/app/currency/${id}/list`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
