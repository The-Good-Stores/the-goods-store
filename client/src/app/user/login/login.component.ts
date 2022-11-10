import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };
  constructor() {}
  showAlert = false;
  alertMsg = 'Logging in...';
  alertColor = 'primary';

  ngOnInit(): void {}
  async login() {
    this.showAlert = true;
    this.alertColor = 'primary';
    this.alertMsg = 'Logging in...';
    try {
      // await this.auth.signInWithEmailAndPassword(
      //   this.credentials.email,
      //   this.credentials.password
      // );
    } catch (e) {
      this.showAlert = true;
      this.alertMsg = 'Error occurred.';
      this.alertColor = 'danger';

      console.error(e);
      return;
    }
    this.alertMsg = 'Logged In.';
    this.alertColor = 'success';
  }
}
