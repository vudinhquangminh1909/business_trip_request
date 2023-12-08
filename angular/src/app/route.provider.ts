import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },

      {
        path: 'newViews',
        name: 'New Trip',
        iconClass: 'fa fa-pencil-square-o',
        order: 2,
        layout: eLayoutType.application,
      },

      {
        path: 'Views',
        name: 'View',
        iconClass: 'fa fa-calendar-minus-o',
        order: 3,
        layout: eLayoutType.application,
      },
    ]);
  };
}
