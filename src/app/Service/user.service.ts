import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../Model/Users";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.apiServerUrl}/user/all`)
  }


  public addUser(user: Users): Observable<Users>{
    return this.http.post<Users>(`${this.apiServerUrl}/user/add`, user)
  }


  public updateUser(user: Users): Observable<Users>{
    return this.http.put<Users>(`${this.apiServerUrl}/user/update`, user)
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`)
  }
}
