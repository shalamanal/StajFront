import { Component, OnInit } from '@angular/core';
import {Users} from "../Model/Users";
import {UserService} from "../Service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Order} from "../Model/Order";
import {OrderService} from "../Service/order.service";



@Component({
  selector: 'app-order-app',
  templateUrl: './order-app.component.html',
  styleUrls: ['./order-app.component.css']
})
export class OrderAppComponent implements OnInit {

  public orders: Order[] = [];
  public updateOrder : Order | undefined;
  public deleteOrder : Order | undefined;

  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.getAllOrders();
  }
  public getAllOrders(): void {
    this.orderService.getOrders().subscribe({
      next:(response: Order[]) => {
        this.orders = response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string,order?: Order): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.deleteOrder = order;
    button.setAttribute('data-target', '#deleteOrderModal');
    container!.appendChild(button);
    button.click();
  }
  public onAddOrder(addForm : NgForm): void{
    // @ts-ignore
    document.getElementById('add-order-form').click();
    console.log("addForm:" + addForm.value);
    this.orderService.addOrder(addForm.value).subscribe({
      next:(responce: Order) => {
        console.log(responce);
        this.getAllOrders();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    });
  }
  public onUpdateOrder(order : Order): void{
    this.orderService.updateOrder(order).subscribe({
      next:(responce: Order) => {
        console.log(responce);
        this.getAllOrders();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    });
  }
  public onDeleteOrder(id : number): void{
    this.orderService.deleteOrder(id).subscribe({
      next:(responce: void) => {
        console.log(responce);
        this.getAllOrders();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    });
  }

  public searchOrders(key : string): void{
    const result: Order[] = [];
    // @ts-ignore
    for (const order of this.orders){
      if(order.order_place.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.order_date.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.machinery.machineryName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.machinery.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.users.nickname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.service.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.service.price.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || order.state.stateName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        result.push(order);
      }
    }
    this.orders = result;
    if(result.length === 0 || !key){
      this.getAllOrders();
    }
  }
}
