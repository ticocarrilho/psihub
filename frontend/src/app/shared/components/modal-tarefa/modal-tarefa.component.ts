import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../../services/tarefas.service';

export interface tarefaModalData {
  paciente: any,
}

@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss']
})
export class ModalTarefaComponent implements OnInit {

  loading = false;
  tarefasForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: tarefaModalData, private toastr: ToastrService, private tarefasService: TarefasService) {
      this.tarefasForm = this.fb.group({
        titulo: ["", Validators.required],
        descricao: ["", Validators.required],
      });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.tarefasForm.status === 'VALID') {
      this.loading = true;
      
      this.tarefasService.postTarefa({
        pacienteId: this.modalData.paciente.id,
        nome: this.tarefasForm.get('titulo')?.value,
        descricao: this.tarefasForm.get('descricao')?.value
      })
      .subscribe({
        next: (data) => {
          this.dialogRef.close(true);
          this.toastr.success('Tarefa criada com sucesso.');
        },
        error: () => {
          this.toastr.error('Não foi possível criar a tarefa.');
        }
      }).add(() => this.loading = false);
    }
  }

}
