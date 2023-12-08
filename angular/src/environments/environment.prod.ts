import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'ePaymentV2',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44390/',
    redirectUri: baseUrl,
    clientId: 'ePaymentV2_App',
    responseType: 'code',
    scope: 'offline_access ePaymentV2',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'http://192.168.200.18',
      rootNamespace: 'Navigos.ePaymentV2',
    },
  },
} as Environment;
