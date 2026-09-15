import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AppService } from '@grumptech/ngx-formly-ui-base';
import { MenuItem, Navigation } from '@grumptech/ngx-basic-ui/navigation';
import { Breadcrumb, BreadcrumbPart } from '@grumptech/ngx-basic-ui/breadcrumb';
import formlyApp from './forms/formly-app.json';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatButton,
    Breadcrumb,
    Navigation,
  ],
  providers: [AppService],
})
export class App {
  menu: MenuItem[];
  breadcrumbParts: Signal<BreadcrumbPart[]>;

  constructor() {
    const appService = inject(AppService);
    appService.initialize(formlyApp[0]);
    this.menu = appService.menu();
    this.breadcrumbParts = appService.breadcrumbParts;
  }
}
