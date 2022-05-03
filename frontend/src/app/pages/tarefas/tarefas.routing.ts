import { Routes, RouterModule } from '@angular/router';
import { TarefasComponent } from './tarefas.component';

const routes: Routes = [
  {
    path: '',
    component: TarefasComponent
  }
];

export const routing = RouterModule.forChild(routes);