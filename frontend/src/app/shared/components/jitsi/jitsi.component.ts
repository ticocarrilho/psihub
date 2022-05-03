import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.scss']
})
export class JitsiComponent implements OnInit, OnDestroy {

  sessionEndSubject = new Subject<any>();

  @Input() set uuid(value: string) {
    if(value) {
      this.options = {
        roomName: value,
        configOverwrite: { prejoinPageEnabled: false },
        onload: () => this.loading = false,
        parentNode: document.querySelector('#jitsi-iframe'),
        userInfo: {
            displayName: this.authService.userName.getValue(),
        }
      };
      
      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

      this.api.addEventListeners({
        videoConferenceLeft: () => this.sessionEndSubject.next(true),
      });
    }
  };

  @Input() paciente: any;
  @Input() psicologo: any;

  loading = true;
  domain: string = 'meet.jit.si';
  options: any;
  api: any;

  constructor(private authService: AuthService, public dialog: MatDialog) {
    this.sessionEndSubject.pipe(
      take(1)
    ).subscribe((val) => {
      if(this.authService.userType.getValue() === 'paciente') {
        let config: MatDialogConfig = {
          minWidth: '50vw',
          data: { psicologoId: this.psicologo.id, pacienteId: this.paciente.id }
        }
    
        const dialogRef = this.dialog.open(ModalFeedbackComponent, config);
      }
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sessionEndSubject.unsubscribe();
  }
}