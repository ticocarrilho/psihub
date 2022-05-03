import { Routes, RouterModule } from '@angular/router';
import { DashboardPsicologoComponent } from './dashboard-psicologo.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPsicologoComponent
  }
];

export const routing = RouterModule.forChild(routes);