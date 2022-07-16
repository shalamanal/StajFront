import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Order} from "../Model/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiServerUrl}/order/all`)
  }


  public addOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${this.apiServerUrl}/order/add`, order)
  }


  public updateOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(`${this.apiServerUrl}/order/update`, order)
  }

  public deleteOrder(orderId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/order/delete/${orderId}`)
  }
}
