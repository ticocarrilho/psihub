import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AnotacoesService } from '../../services/anotacoes.service';

@Component({
  selector: 'app-anotacoes-list',
  templateUrl: './anotacoes-list.component.html',
  styleUrls: ['./anotacoes-list.component.scss']
})
export class AnotacoesListComponent implements OnInit, OnDestroy {

  @Input() scrollDisabled = false;
  @Input() set userId(value: number) {
    if(value) {
      this.getAnotacoes(value);
    }
  }

  @Input() set refresh(value: Subject<any>) {
    if(value) {
      value.subscribe(val => {
        this.currentPage = 1;
        this.getAnotacoes(this.userId);
      })
    }
  }

  loading = false;
  currentPage = 1;
  totalPages = 0;
  throttle = 0;
  distance = 2;
  anotacoes: any[] = [];
  loadingArray: boolean[] = [];
  
  constructor(private anotacoesService: AnotacoesService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.refresh) {
      this.refresh.unsubscribe();
    }
  }

  getAnotacoes(userId: number) {
    this.anotacoes = [];
    this.loading = true;
    this.anotacoesService.getAnotacoes(this.currentPage, userId)
      .subscribe({
        next: (data) => {
          this.totalPages = Math.ceil(data.count/10)
          this.anotacoes = data.rows;
        },
        error: (err) => {
          this.toastr.error('Não foi carregar as anotações.')
        }
      }).add(() => this.loading = false);
  }

  onScroll() {
    if(this.userId) {
      this.currentPage++;
      this.anotacoesService.getAnotacoes(this.currentPage, this.userId)
      .subscribe({
        next: (data: any) => {
          this.anotacoes.push(...data.rows);
        },
        error: () => {
          this.toastr.error('Não foi possível carregar as anotações.')
        }
      });
    }
  }

  deleteAnotacao(anotacao: any, anotacaoIndex: number) {
    this.loadingArray[anotacaoIndex] = true;
    this.anotacoesService.deleteAnotacao(anotacao.id).subscribe({
      next: (data: any) => {
        this.getAnotacoes(this.userId);
        this.toastr.success('Anotação deletada com sucesso');
      },
      error: () => {
        this.toastr.error('Não foi possível deletar a anotação.')
      }
    }).add(() => this.loadingArray[anotacaoIndex] = false);
  }

}
