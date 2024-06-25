import { Route } from '@angular/router';

import { AddShowroomComponent } from './pages/add-showroom/add-showroom.component';
import { EditShowroomComponent } from './pages/edit-showroom/edit-showroom.component';
import { ShowroomDetailComponent } from './pages/showroom-detail/showroom-detail.component';
import { ShowroomsComponent } from './pages/showrooms/showrooms.component';
import { showroomResolver } from './resolvers/showroom.resolver';

export const showroomsUiRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: ShowroomsComponent,
    children: [
      {
        path: 'add',
        pathMatch: 'full',
        component: AddShowroomComponent,
      },
      {
        path: ':slug/edit',
        pathMatch: 'full',
        component: EditShowroomComponent,
        resolve: { showroom: showroomResolver },
      },
      {
        path: ':slug',
        pathMatch: 'full',
        component: ShowroomDetailComponent,
        resolve: { showroom: showroomResolver },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'add',
      },
    ],
  },
];
