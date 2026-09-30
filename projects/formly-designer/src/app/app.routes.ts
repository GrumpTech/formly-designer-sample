import { inject, Provider, Type } from '@angular/core';
import { Route } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { map, of } from 'rxjs';
import { MatxConfirmationDialog } from '@grumptech/ngx-matx/confirmation-dialog';
import { withFormlyEditorTypes } from '@grumptech/ngx-formly-designer/ui-editor';
import {
  FormLoader,
  FormlyDesigner,
} from '@grumptech/ngx-formly-designer/designer';
import {
  FormLoaderFromImporter,
  provideImporter,
} from '@grumptech/ngx-formly-designer/importers';
import { ExtendedOpenApiAppImporter } from '@grumptech/ngx-formly-designer/importers';
import { provideFormlyConfig } from '@ngx-formly/core';
import { IFormsLoader } from '@grumptech/ngx-formly-ui-base/loaders';
import { IFormLoader } from '@grumptech/ngx-formly-ui-base/defs';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@grumptech/ngx-formly-designer/designer').then(
        (m) => m.FormlyDesigner,
      ),
    canDeactivate: [
      (component: FormlyDesigner) =>
        component.hasModifiedTabs()
          ? inject(MatDialog)
              .open(MatxConfirmationDialog, {
                data: {
                  title: 'Leaving designer?',
                  message: `Unsaved changes will be lost.`,
                },
              })
              .afterClosed()
              .pipe(map((confirmed) => confirmed === true))
          : of(true),
    ],
    providers: [provideFormlyConfig(withFormlyEditorTypes())],
  },
  getAppRoute('app', FormLoader),
  getAppRoute('open-api-client', FormLoaderFromImporter, [
    provideImporter({
      url: '/api/swagger/v1/swagger.json',
      importer: ExtendedOpenApiAppImporter,
    }),
  ]),
];

function getAppRoute(
  path: string,
  formsLoader: Type<IFormsLoader>,
  providers: Provider[] = [],
): Route {
  providers.push(
    { provide: IFormLoader, useClass: formsLoader },
    { provide: IFormsLoader, useClass: formsLoader },
  );
  return {
    path: path,
    loadComponent: () =>
      import('@grumptech/ngx-formly-ui-base/loaders').then(
        (m) => m.AppAndFormsLoader,
      ),
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('@grumptech/ngx-formly-ui-base/loaders').then(
            (m) => m.PageLoader,
          ),
      },
    ],
    providers: providers,
  };
}
