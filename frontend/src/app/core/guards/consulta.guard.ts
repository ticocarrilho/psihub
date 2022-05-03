import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AgendamentoService } from 'src/app/shared/services/agendamento.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaGuard implements CanActivateChild {

  constructor(private agendamentoService: AgendamentoService, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable<boolean>(obs => {
        if(childRoute.paramMap.get('id') !== null && this.authService.isLoggedIn.getValue()) {
          const id = childRoute.paramMap.get('id');
          //@ts-ignore
          this.agendamentoService.getConsultaById(id).subscribe({
            next: (val) => {
              obs.next(val.id === Number(id));
            },
            error: () => {
              obs.next(false);
            }
          });
        } else {
          obs.next(false)
        }
      });
  }
  
}
