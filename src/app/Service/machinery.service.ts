import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Machinery} from "../Model/Machinery";

@Injectable({
  providedIn: 'root'
})
export class MachineryService {
  private apiServerUrl = environment.apiBaseUrl;
  private token: any;
  constructor(private http : HttpClient) { }

  public getMachinerys(): Observable<Machinery[]>{
    return this.http.get<Machinery[]>(`${this.apiServerUrl}/machinery/all`,{
      headers: new HttpHeaders({Authorization: this.token.getToken()
      })
    });
  }


  public addMachinery(machinery: Machinery): Observable<Machinery>{
    return this.http.post<Machinery>(`${this.apiServerUrl}/machinery/add`, machinery)
  }


  public updateMachinery(machinery: Machinery): Observable<Machinery>{
    return this.http.put<Machinery>(`${this.apiServerUrl}/machinery/update`, machinery)
  }

  public deleteMachinery(machineryId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/machinery/delete/${machineryId}`)
  }
}
