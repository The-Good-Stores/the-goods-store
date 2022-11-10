import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IUser from '../../models/user.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  credentials = {
    email: '',
    username: '',
    password: '',
  };
  constructor(private userService: UserService) {}
  showAlert = false;
  alertMsg = 'Register...';
  alertColor = 'primary';

  ngOnInit(): void {}
  register() {
    this.showAlert = true;
    this.alertColor = 'primary';
    this.alertMsg = 'Logging in...';
    try {
      const user: IUser = {
        username: this.credentials.username,
        email: this.credentials.email,
        password: this.credentials.password,
      };
      console.log({ user });
      this.userService.register(user).subscribe()
    } catch (e) {
      this.showAlert = true;
      this.alertMsg = 'Error occurred.';
      this.alertColor = 'danger';

      console.error(e);
      return;
    }
    this.alertMsg = 'Registered.';
    this.alertColor = 'success';
  }
}
