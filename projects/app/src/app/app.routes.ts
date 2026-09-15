import { Route } from '@angular/router';
import { PageLoader } from '@grumptech/ngx-formly-ui-base';
import { CustomPage } from './pages/custom-page/custom-page.component';

export const routes: Route[] = [
  {
    path: '',
    children: [
      { path: 'custom-page', component: CustomPage },
      { path: '**', component: PageLoader },
    ],
  },
];
