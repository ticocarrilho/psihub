import { Routes, RouterModule } from '@angular/router';
import { ConsultaComponent } from './consulta.component';

const routes: Routes = [
  {
    path: ':id',
    component: ConsultaComponent
  }
];

export const routing = RouterModule.forChild(routes);