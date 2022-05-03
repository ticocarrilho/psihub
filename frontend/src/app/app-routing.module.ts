import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ConsultaGuard } from './core/guards/consulta.guard';
import { PacienteDetailsGuard } from './core/guards/paciente-details.guard';
import { PacienteGuard } from './core/guards/paciente.guard';
import { PsicologoGuard } from './core/guards/psicologo.guard';

const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'psicologos',
        pathMatch: 'full',
      }, {
        path: 'psicologos',
        loadChildren: () => import('./pages/psicologos/psicologos.module').then(m => m.PsicologosModule),
        data: {
          title: 'Psicólogos Disponíveis'
        }
      },
      {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule),
        data: {
          title: 'Cadastro'
        }
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
        data: {
          title: 'Cadastro'
        }
      },
    ]
  },
  {
    path: 'paciente',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      }, {
        path: 'info',
        canActivateChild: [PacienteDetailsGuard],
        loadChildren: () => import('./pages/paciente-details/paciente-detail.module').then(m => m.PacienteDetailsModule),
        data: {
          title: 'Informações Paciente'
        }
      }, {
        path: 'psicologos',
        canActivateChild: [PacienteGuard],
        loadChildren: () => import('./pages/psicologos/psicologos.module').then(m => m.PsicologosModule),
        data: {
          title: 'Psicólogos Disponíveis'
        }
      }, {
        path: 'consultas',
        canActivateChild: [PacienteGuard],
        loadChildren: () => import('./pages/consultas-paciente/consultas-paciente.module').then(m => m.ConsultasPacienteModule),
        data: {
          title: 'Consultas'
        }
      }, {
        path: 'tarefas',
        canActivateChild: [PacienteGuard],
        loadChildren: () => import('./pages/tarefas/tarefas.module').then(m => m.TarefasModule),
        data: {
          title: 'Tarefas'
        }
      }
      
    ]
  },
  {
    path: 'psicologo',
    component: LayoutComponent,
    canActivateChild: [PsicologoGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard-psicologo/dashboard-psicologo.module').then(m => m.DashboardPsicologosModule),
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'pacientes',
        loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule),
        data: {
          title: 'Pacientes'
        }
      }, {
        path: 'feedbacks',
        loadChildren: () => import('./pages/feedbacks/feedbacks.module').then(m => m.FeedbacksModule),
        data: {
          title: 'Feedbacks'
        }
      },
    ]
  },
  {
    path: 'consulta',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivateChild: [ConsultaGuard],
        loadChildren: () => import('./pages/consulta/consulta.module').then(m => m.ConsultaModule),
        data: {
          title: 'Consulta'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
