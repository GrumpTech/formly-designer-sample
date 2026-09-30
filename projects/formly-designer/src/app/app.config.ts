import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideFormlyCore } from '@ngx-formly/core';
import { provideFormlyDesigner } from '@grumptech/ngx-formly-designer/designer';
import { MessageService } from '@grumptech/ngx-formly-ui-material/core';
import { withFormlyUiMaterial } from '@grumptech/ngx-formly-ui-material';
import { provideFormlyAppConfig } from '@grumptech/ngx-formly-ui-base/core';
import { designerConfig } from './config/designer-config';
import { routes } from './app.routes';
import { CustomErrorMessage } from '../../../app/src/app/types/custom-app-error/custom-error-message.type';
import { CustomType } from '../../../app/src/app/types/custom-type/custom-type.type';
import { EmptyFormLoader } from '@grumptech/ngx-formly-ui-base/loaders';

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
      formLoader: EmptyFormLoader,
      frontendBaseUrl: '',
      messageService: MessageService,
    }),
    provideFormlyDesigner(designerConfig),
  ],
};
