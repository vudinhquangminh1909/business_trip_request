import type { CreateUpdateTripInformationDTO, TripInformationDTO } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripInformationService {
  apiName = 'Default';
  

  checkTripInformation = (dto: CreateUpdateTripInformationDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/trip-information/check-trip-information',
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  createList = (dto: CreateUpdateTripInformationDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripInformationDTO>({
      method: 'POST',
      url: '/api/app/trip-information/list',
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  deleteList = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/trip-information/${id}/list`,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripInformationDTO[]>({
      method: 'GET',
      url: '/api/app/trip-information',
    },
    { apiName: this.apiName,...config });
  

  getListID = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripInformationDTO>({
      method: 'GET',
      url: `/api/app/trip-information/${id}/i-d`,
    },
    { apiName: this.apiName,...config });
  

  updateList = (id: string, dto: CreateUpdateTripInformationDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripInformationDTO>({
      method: 'PUT',
      url: `/api/app/trip-information/${id}/list`,
      body: dto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
