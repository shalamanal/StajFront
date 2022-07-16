import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Service} from "../Model/Service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(`${this.apiServerUrl}/service/all`)
  }


  public addService(service: Service): Observable<Service>{
    return this.http.post<Service>(`${this.apiServerUrl}/service/add`, service)
  }


  public updateService(service: Service): Observable<Service>{
    return this.http.put<Service>(`${this.apiServerUrl}/service/update`, service)
  }

  public deleteService(serviceId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/service/delete/${serviceId}`)
  }
}
