import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideFormlyCore } from '@ngx-formly/core';
import { provideFormlyDesigner } from '@grumptech/ngx-formly-designer';
import { designerConfig } from './config/designer-config';
import {
  MessageService,
  withFormlyUiMaterial,
} from '@grumptech/ngx-formly-ui-material';
import { provideFormlyAppConfig } from '@grumptech/ngx-formly-ui-base';
import { routes } from './app.routes';
import { CustomErrorMessage } from '../../../app/src/app/types/custom-app-error/custom-error-message.type';
import { CustomType } from '../../../app/src/app/types/custom-type/custom-type.type';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideNativeDateAdapter(),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      },
    },

    provideFormlyCore(
      withFormlyUiMaterial().concat([
        {
          types: [
            { name: 'error-message', component: CustomErrorMessage },
            { name: 'custom-type', component: CustomType },
          ],
        },
      ]),
    ),
    provideFormlyAppConfig({
      baseUrl: '/api',
      frontendBaseUrl: '',
      messageService: MessageService,
    }),
    provideFormlyDesigner(designerConfig),
  ],
};
