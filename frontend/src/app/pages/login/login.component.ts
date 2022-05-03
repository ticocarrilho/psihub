import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  maxDate: Date;
  loading = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.maxDate = new Date();
    this.loginForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      senha: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if(this.loginForm.status === 'VALID') {
      this.loading = true;
      this.authService.login(this.loginForm.value)
      .subscribe({
        next: (data: any) => {
          this.toastr.success('Login realizado com sucesso.');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          if(err.error.hasOwnProperty('error') && err.error.error.length > 0) {
            const errorObject = err.error.error.shift();

            this.toastr.error(errorObject.msg);
          } else {
            this.toastr.error('Não foi possível realizar o Login.');
          }        
        }
      }).add(() => this.loading = false);
    }
  }

}
