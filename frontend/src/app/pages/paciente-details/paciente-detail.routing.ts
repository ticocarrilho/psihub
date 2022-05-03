import { Routes, RouterModule } from '@angular/router';
import { PacienteDetailsComponent } from './paciente-details.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteDetailsComponent
  },
  {
    path: ':id',
    component: PacienteDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);