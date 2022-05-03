import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  userType = '';

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });

    this.authService.userType.subscribe((value: string) => {
      this.userType = value;
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
