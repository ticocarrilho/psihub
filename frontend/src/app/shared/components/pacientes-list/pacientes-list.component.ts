import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss']
})
export class PacientesListComponent implements OnInit {

  loading = false;
  currentPage = 1;
  totalPages = 0;
  throttle = 0;
  distance = 2;
  pacientes: any = [];

  constructor(private pacientesService: PacientesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
    this.pacientesService.getPacientes().subscribe({
      next: (data) => {
        this.totalPages = Math.ceil(data.count/10)
        this.pacientes = data.rows;
      },
      error: (err) => {
        this.toastr.error('Não foi carregar os pacientes.')
      }
    }).add(() => this.loading = false);
  }

  onScroll() {
    this.currentPage++;
    this.pacientesService.getPacientes()
      .subscribe({
        next: (data: any) => {
          this.pacientes.push(...data.rows);
        },
        error: () => {
          this.toastr.error('Não foi possível carregar os pacientes.')
        }
      });
  }

}
