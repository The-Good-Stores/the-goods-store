import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  public register(user: IUser) {
    return this.http.post("http://localhost:8000/api/user/register", user)
  }
}
