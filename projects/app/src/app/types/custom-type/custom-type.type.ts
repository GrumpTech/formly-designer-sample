import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

export interface CustomTypeProps {
  message?: string;
}

@Component({
  selector: 'demo-custom-type',
  templateUrl: './custom-type.type.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomType extends FieldType<FormlyFieldConfig<CustomTypeProps>> {}
