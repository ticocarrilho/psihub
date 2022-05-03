import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TarefasService } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefas-list',
  templateUrl: './tarefas-list.component.html',
  styleUrls: ['./tarefas-list.component.scss']
})
export class TarefasListComponent implements OnInit, OnDestroy {

  @Input() scrollDisabled = false;

  @Input() set refresh(value: Subject<any>) {
    if(value) {
      value.subscribe(val => {
        this.currentPage = 1;
        this.getTarefas();
      })
    }
  }

  loading = false;
  currentPage = 1;
  totalPages = 0;
  throttle = 0;
  distance = 2;
  tarefas: any[] = [];
  loadingArray: boolean[] = [];
  userType = '';

  constructor(private tarefasService: TarefasService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.authService.userType.getValue();
    this.getTarefas();
  }

  ngOnDestroy(): void {
    if(this.refresh) {
      this.refresh.unsubscribe();
    }
  }

  getTarefas() {
    this.tarefas = [];
    this.loading = true;
    this.tarefasService.getTarefas(this.currentPage)
      .subscribe({
        next: (data) => {
          this.totalPages = Math.ceil(data.count/10)
          this.tarefas = data.rows;
        },
        error: (err) => {
          this.toastr.error('Não foi carregar as tarefas.')
        }
      }).add(() => this.loading = false);
  }

  onScroll() {
    this.currentPage++;
    this.tarefasService.getTarefas(this.currentPage)
    .subscribe({
      next: (data: any) => {
        this.tarefas.push(...data.rows);
      },
      error: () => {
        this.toastr.error('Não foi possível carregar as tarefas.')
      }
    });
  }

  changeTarefaStatus(tarefa: any, tarefaIndex: number) {
    this.loadingArray[tarefaIndex] = true;
    this.tarefasService.updateTarefa(tarefa.id, {
      ...tarefa,
      realizada: !tarefa.realizada
    }).subscribe({
      next: (data: any) => {
        this.getTarefas();
        this.toastr.success('Tarefa atualizada com sucesso');
      },
      error: () => {
        this.toastr.error('Não foi possível atualizar a tarefa.')
      }
    }).add(() => this.loadingArray[tarefaIndex] = false);
  }

  deleteTarefa(tarefa: any, tarefaIndex: number) {
    this.loadingArray[tarefaIndex] = true;
    this.tarefasService.deleteTarefa(tarefa.id).subscribe({
      next: (data: any) => {
        this.getTarefas();
        this.toastr.success('Tarefa deletada com sucesso');
      },
      error: () => {
        this.toastr.error('Não foi possível deletar a tarefa.')
      }
    }).add(() => this.loadingArray[tarefaIndex] = false);
  }

}
