import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-psicologo',
  templateUrl: './dashboard-psicologo.component.html',
  styleUrls: ['./dashboard-psicologo.component.scss']
})
export class DashboardPsicologoComponent implements OnInit {
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
