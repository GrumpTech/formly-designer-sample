# Formly Designer sample

This repository demonstrates a new approach to frontend development. Instead of building an entire frontend from code, you can generate an application from an OpenAPI specification or build and modify it using a visual editor.

As a developer, you focus on building and maintaining reusable components. The [visual editor](https://grumptech.github.io/demos/formly-designer) makes it easy to assemble and configure those components into a complete frontend, significantly reducing the amount of UI code you need to write.

## Getting started

First, clone this repository. Then, run one of the following commands:

```
ng serve app
```

to start the [sample application](projects/app), or:

```
npm run designer
```

to launch the visual designer.

The [designer](/projects/formly-designer) is a lightweight wrapper application around the [Formly Designer](https://grumptech.github.io/products/formly-designer/) libraries. When the designer starts, it also launches a small [local file service](/projects/formly-designer/local-file-service.js) that stores the [forms](/projects/app/src/app/forms) used by the sample application.

### Generate a frontend from an OpenApi specification

Use an OpenAPI specification to generate the frontend application.

1. Launch the Visual Designer.
2. Select File → Import → OpenAPI 3.0 App.
3. Select the OpenAPI specification to import.
4. The Visual Designer generates the application based on the specification.
5. Customize the generated application using the Visual Designer.
6. To test against a backend, alter the [proxy config](projects/formly-designer/proxy.config.json) to point to the correct URL.
   _With the proxy configuration you don’t need CORS because the browser sees the request as same-origin._

### Create a custom type

You can extend the application by creating custom types and registering them with the Visual Designer. This allows you to build reusable UI elements while keeping their composition and configuration within the designer.

For example, the following configuration registers two custom types for the sample application: one that overrides the existing error-message type and another that introduces a new type.

```typescript
  provideFormlyCore(
    withFormlyUiMaterial().concat([
      {
        types: [
          { name: 'error-message', component: CustomErrorMessage },
          { name: 'custom-type', component: CustomComponent },
        ],
      },
    ]),
  ),
```

### Register a type to the visual designer

Custom types can be registered with the Visual Designer using the same configuration approach. See [app.config.ts](projects/formly-designer/src/app/app.config.ts). The properties available for editing can be configured for each type.

The following example exposes the **key**, **type**, and **props.message** properties of the custom type in the designer:

```typescript
export const designerConfig: DesignerConfig = {
  ...
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
  ...
};
```

The **properties** configuration defines the properties available in the editor, while **propertiesByType** specifies which properties are exposed for each type.
