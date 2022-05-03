import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteDetailsGuard implements CanActivateChild {

  constructor(private pacienteService: PacientesService, private authService: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable<boolean>(obs => {
        if(childRoute.paramMap.get('id') !== null && this.authService.isLoggedIn.getValue()) {
          const id = childRoute.paramMap.get('id');
          //@ts-ignore
          this.pacienteService.getPacienteById(id).subscribe({
            next: (val) => {
              obs.next(val.id === Number(id));
            },
            error: () => {
              this.router.navigate([`/`]);
              obs.next(false);
            }
          });
        } else {
          this.pacienteService.getPacienteMe().subscribe({
            next: (val) => {
              if(val.contrato) {
                return obs.next(true);
              }

              this.router.navigate([`/paciente/psicologos`]);

              obs.next(false);
            },
            error: () => {
              if(this.authService.userType.getValue() === 'paciente') {
                this.router.navigate([`/paciente/psicologos`]);
                obs.next(false);  
              }
            }
          });
        }
      });
  }
  
}
