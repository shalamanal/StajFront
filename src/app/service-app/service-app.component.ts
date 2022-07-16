import { Component, OnInit } from '@angular/core';
import {Service} from "../Model/Service";
import {ServiceService} from "../Service/service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-service-app',
  templateUrl: './service-app.component.html',
  styleUrls: ['./service-app.component.css']
})
export class ServiceAppComponent implements OnInit {
  public services: Service[] | undefined;
  public updateService : Service | undefined;
  public deleteService : Service | undefined;
  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getAllServices();
  }
  public getAllServices(): void {
    this.serviceService.getServices().subscribe({
      next:(response: Service[]) => {
        this.services = response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string,service?: Service): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addServiceModal');
    }
    else{
      if(mode === 'edit'){
        this.updateService = service;
        button.setAttribute('data-target', '#editServiceModal');
      }
      else{
        this.deleteService = service;
        button.setAttribute('data-target', '#deleteServiceModal');
      }
    }
    container!.appendChild(button);
    button.click();
  }
  public onAddService(addForm : NgForm): void{
    // @ts-ignore
    document.getElementById('add-service-form').click();
    console.log("addForm:" + addForm.value);
    this.serviceService.addService(addForm.value).subscribe({
      next:(responce: Service) => {
        this.getAllServices();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  public onUpdateService(service : Service): void{
    console.log(service);
    this.serviceService.updateService(service).subscribe({
      next:(responce: Service) => {
        console.log(responce);
        this.getAllServices();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  public onDeleteService(id : number): void{
    this.serviceService.deleteService(id).subscribe({
      next:(responce: void) => {
        console.log(responce);
        this.getAllServices();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }

  public searchService(key : string): void{
    const result: Service[] = [];
    // @ts-ignore
    for (const service of this.services){
      if(service.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || service.price.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        result.push(service);
      }
    }
    this.services = result;
    if(result.length === 0 || !key){
      this.getAllServices();
    }
  }


}

