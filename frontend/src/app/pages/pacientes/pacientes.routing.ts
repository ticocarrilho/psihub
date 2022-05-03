import { Routes, RouterModule } from '@angular/router';
import { PacientesComponent } from './pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: PacientesComponent
  }
];

export const routing = RouterModule.forChild(routes);