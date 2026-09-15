import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrl: './custom-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPage {}
