import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  ExtendedJsonSchemaImporter,
  ExtendedOpenApiAppImporter,
  ExtendedOpenApiImporter,
  JsonImporter,
} from '@grumptech/ngx-formly-importers';
import { DesignerConfig } from '@grumptech/ngx-formly-designer';

export const designerConfig: DesignerConfig = {
  importers: [
    JsonImporter,
    ExtendedJsonSchemaImporter,
    ExtendedOpenApiImporter,
    ExtendedOpenApiAppImporter,
  ],
  editor: {
    properties: {
      'props.message': {
        key: 'props.message',
        type: 'formly-editor-input',
        props: { label: 'message' },
      },
    },
    propertiesByType: {
      'custom-type': ['key', 'type', 'props.message'],
    },
    formRenderConfig: {
      editFormFieldConverter: (field: FormlyFieldConfig) => {
        field.hide && delete field.hide;
        field.expressions && delete field.expressions;
        field.props?.url && delete field.props.url;
        field.props?.autoRun && delete field.props.autoRun;
      },
      testFormFieldConverter: (field: FormlyFieldConfig) => {
        field.type === 'page' &&
          (field.props ??= {}) &&
          (field.props.navigationDisabled = true);
      },
    },
  },
  storage: 'file',
  fileServiceUrl: '/file-service',
};
