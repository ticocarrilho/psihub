import { Routes, RouterModule } from '@angular/router';
import { PsicologosComponent } from './psicologos.component';

const routes: Routes = [
  {
    path: '',
    component: PsicologosComponent
  }
];

export const routing = RouterModule.forChild(routes);