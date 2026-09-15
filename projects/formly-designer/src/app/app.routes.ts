import { inject, Provider } from '@angular/core';
import { Route } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { map, of } from 'rxjs';
import { MatxConfirmationDialog } from '@grumptech/ngx-matx/confirmation-dialog';
import { withFormlyEditorTypes } from '@grumptech/ngx-formly-ui-editor';
import { FormLoader, FormlyDesigner } from '@grumptech/ngx-formly-designer';
import {
  provideFormsLoader,
  provideFormsLoaderFromImporter,
} from '@grumptech/ngx-formly-form-loaders';
import { ExtendedOpenApiAppImporter } from '@grumptech/ngx-formly-importers';
import { provideFormlyConfig } from '@ngx-formly/core';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@grumptech/ngx-formly-designer').then((m) => m.FormlyDesigner),
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
  getAppRoute('app', provideFormsLoader(FormLoader)),
  getAppRoute(
    'open-api-client',
    provideFormsLoaderFromImporter({
      url: '/api/swagger/v1/swagger.json',
      importer: ExtendedOpenApiAppImporter,
    }),
  ),
];

function getAppRoute(path: string, formsLoader: Provider): Route {
  return {
    path: path,
    loadComponent: () =>
      import('@grumptech/ngx-formly-form-loaders').then(
        (m) => m.AppAndFormsLoader,
      ),
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('@grumptech/ngx-formly-ui-base').then((m) => m.PageLoader),
      },
    ],
    providers: [formsLoader],
  };
}
