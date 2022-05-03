import { Routes, RouterModule } from '@angular/router';
import { ConsultasPacienteComponent } from './consultas-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultasPacienteComponent
  }
];

export const routing = RouterModule.forChild(routes);