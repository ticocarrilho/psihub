import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MaxSizeValidator } from '@angular-material-components/file-input';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  maxDate: Date;
  isPsicologo: FormControl;
  loading = false;

  estados = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espirito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso do Sul',
    'Mato Grosso',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];

  constructor(private authService: AuthService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.maxDate = new Date();
    this.isPsicologo = new FormControl(false);

    this.signupForm = this.fb.group({
      nome: ["", Validators.required],
      dataNascimento: ["", Validators.required],
      telefone: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      senha: ["", Validators.required],
      estado: [""],
      crp: [""],
      biografia: [""],
      precoSessao: [""],
      imagem: [""],
      comecoAtendimento: [moment().set({ "hour": 8, "minute": 0 })],
      finalAtendimento: [moment().set({ "hour": 17, "minute": 0 })],
      formacoes: new FormArray([])
    });

    this.isPsicologo.valueChanges.subscribe((value) => {
      if(value) { 
        this.signupForm.get('estado')?.addValidators(Validators.required);
        this.signupForm.get('crp')?.addValidators(Validators.required);
        this.signupForm.get('biografia')?.addValidators(Validators.required);
        this.signupForm.get('precoSessao')?.addValidators(Validators.required);
        this.signupForm.get('precoSessao')?.addValidators(Validators.min(30));
        this.signupForm.get('formacoes')?.addValidators(Validators.required);
        this.signupForm.get('imagem')?.addValidators(Validators.required);
        this.signupForm.get('imagem')?.addValidators(MaxSizeValidator(3024 * 1024));
        this.signupForm.get('comecoAtendimento')?.addValidators(Validators.required);
        this.signupForm.get('finalAtendimento')?.addValidators(Validators.required);

        this.signupForm.get('estado')?.updateValueAndValidity();
        this.signupForm.get('crp')?.updateValueAndValidity();
        this.signupForm.get('biografia')?.updateValueAndValidity();
        this.signupForm.get('precoSessao')?.updateValueAndValidity();
        this.signupForm.get('formacoes')?.updateValueAndValidity();
        this.signupForm.get('imagem')?.updateValueAndValidity();
        this.signupForm.get('comecoAtendimento')?.updateValueAndValidity();
        this.signupForm.get('finalAtendimento')?.updateValueAndValidity();
      } else {
        this.signupForm.get('estado')?.clearValidators();
        this.signupForm.get('crp')?.clearValidators();
        this.signupForm.get('biografia')?.clearValidators();
        this.signupForm.get('precoSessao')?.clearValidators();
        this.signupForm.get('formacoes')?.clearValidators();
        this.signupForm.get('imagem')?.clearValidators();
        this.signupForm.get('comecoAtendimento')?.clearValidators();
        this.signupForm.get('finalAtendimento')?.clearValidators();

        this.signupForm.get('estado')?.updateValueAndValidity();
        this.signupForm.get('crp')?.updateValueAndValidity();
        this.signupForm.get('biografia')?.updateValueAndValidity();
        this.signupForm.get('precoSessao')?.updateValueAndValidity();
        this.signupForm.get('formacoes')?.updateValueAndValidity();
        this.signupForm.get('imagem')?.updateValueAndValidity();
        this.signupForm.get('comecoAtendimento')?.updateValueAndValidity();
        this.signupForm.get('finalAtendimento')?.updateValueAndValidity();
      }

      this.signupForm.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if(this.signupForm.status === 'VALID') {
      let type = 'paciente', body = this.signupForm.value;

      
      if(this.isPsicologo.value) {
        body = {
          ...body,
          formacoes: JSON.stringify(body.formacoes),
          comecoAtendimento: moment(body.comecoAtendimento).format('HH:mm'),
          finalAtendimento: moment(body.finalAtendimento).format('HH:mm')
        }
        type = 'psicologo';
      }

      this.loading = true;
      this.authService.signUp(body, type)
        .subscribe({
          next: (data: any) => {
            this.toastr.success('Conta criada com sucesso.');
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            if(err.error.hasOwnProperty('error') && err.error.error.length > 0) {
              this.toastr.error(err.error.error.shift().msg);
            } else {
              this.toastr.error('Não foi possível realizar o Login.');
            }        
          }
        }).add(() => this.loading = false);
    }
  }

  getFormacoesFormArray() {
    return (this.signupForm.get('formacoes') as FormArray);
  }

}
