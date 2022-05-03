import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AnotacoesService } from '../../services/anotacoes.service';

export interface anotacaoModalData {
  paciente: any,
}

@Component({
  selector: 'app-modal-anotacao',
  templateUrl: './modal-anotacao.component.html',
  styleUrls: ['./modal-anotacao.component.scss']
})
export class ModalAnotacaoComponent implements OnInit {

  loading = false;
  anotacaoForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalAnotacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: anotacaoModalData, private toastr: ToastrService, private anotacoesService: AnotacoesService) {
      this.anotacaoForm = this.fb.group({
        titulo: ["", Validators.required],
        descricao: ["", Validators.required],
      });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.anotacaoForm.status === 'VALID') {
      this.loading = true;
      
      this.anotacoesService.postAnotacao({
        pacienteId: this.modalData.paciente.id,
        titulo: this.anotacaoForm.get('titulo')?.value,
        descricao: this.anotacaoForm.get('descricao')?.value
      })
      .subscribe({
        next: (data) => {
          this.dialogRef.close(true);
          this.toastr.success('Anotação criada com sucesso.');
        },
        error: () => {
          this.toastr.error('Não foi possível gerar a anotação.');
        }
      }).add(() => this.loading = false);
    }
  }

}
