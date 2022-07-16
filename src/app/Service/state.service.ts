import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {State} from "../Model/State";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getStates(): Observable<State[]>{
    return this.http.get<State[]>(`${this.apiServerUrl}/state/all`)
  }


  public addState(state: State): Observable<State>{
    return this.http.post<State>(`${this.apiServerUrl}/state/add`, state)
  }


  public updateState(state: State): Observable<State>{
    return this.http.put<State>(`${this.apiServerUrl}/state/update`, state)
  }

  public deleteState(stateId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/state/delete/${stateId}`)
  }
}
