import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FeedbacksService } from '../../services/feedbacks.service';

export interface feedbackModalData {
  pacienteId: number,
  psicologoId: number
}

@Component({
  selector: 'app-modal-feedback',
  templateUrl: './modal-feedback.component.html',
  styleUrls: ['./modal-feedback.component.scss']
})
export class ModalFeedbackComponent implements OnInit {
  
  loading = false;
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: feedbackModalData, private toastr: ToastrService, private feedbackService: FeedbacksService) {
      this.feedbackForm = this.fb.group({
        descricao: ["", Validators.required],
      });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.feedbackForm.status === 'VALID') {
      this.loading = true;
      
      this.feedbackService.postFeedback({
        pacienteId: this.modalData.pacienteId,
        psicologoId: this.modalData.psicologoId,
        descricao: this.feedbackForm.get('descricao')?.value
      })
      .subscribe({
        next: (data) => {
          this.dialogRef.close(true);
          this.toastr.success('Feedback criado com sucesso.');
        },
        error: () => {
          this.toastr.error('Não foi possível criar o Feedback.');
        }
      }).add(() => this.loading = false);
    }
  }

}
