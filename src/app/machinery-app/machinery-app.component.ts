import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Machinery} from "../Model/Machinery";
import {MachineryService} from "../Service/machinery.service";

@Component({
  selector: 'app-machinery-app',
  templateUrl: './machinery-app.component.html',
  styleUrls: ['./machinery-app.component.css']
})
export class MachineryAppComponent implements OnInit {
  public machinerys: Machinery[] | undefined;
  public updateMachinery : Machinery | undefined;
  public deleteMachinery : Machinery | undefined;
  constructor(private  machineryService: MachineryService) { }

  ngOnInit(): void {
    this.getAllMachinerys();
  }
  public getAllMachinerys(): void {
    this.machineryService.getMachinerys().subscribe({
      next:(response: Machinery[]) => {
        this.machinerys = response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string,machinery?: Machinery): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addMachineryModal');
    }
    else{
      if(mode === 'edit'){
        this.updateMachinery = machinery;
        button.setAttribute('data-target', '#editMachineryModal');
      }
      else{
        this.deleteMachinery = machinery;
        button.setAttribute('data-target', '#deleteMachineryModal');
      }
    }
    container!.appendChild(button);
    button.click();
  }
  public onAddMachinery(addForm : NgForm): void{
    // @ts-ignore
    document.getElementById('add-machinery-form').click();
    console.log("addForm:" + addForm.value);
    this.machineryService.addMachinery(addForm.value).subscribe({
      next:(responce: Machinery) => {
        this.getAllMachinerys();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  public onUpdateMachinery(machinery : Machinery): void{
    console.log(machinery);
    this.machineryService.updateMachinery(machinery).subscribe({
      next:(responce: Machinery) => {
        console.log(responce);
        this.getAllMachinerys();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  public onDeleteMachinery(id : number): void{
    alert(id);
    this.machineryService.deleteMachinery(id).subscribe({
      next:(responce: void) => {
        console.log(responce);
        this.getAllMachinerys();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }

  public searchMachinery(key : string): void{
    const result: Machinery[] = [];
    // @ts-ignore
    for (const machinery of this.machinerys){
      if(machinery.machineryName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || machinery.description.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        result.push(machinery);
      }
    }
    this.machinerys = result;
    if(result.length === 0 || !key){
      this.getAllMachinerys();
    }
  }


}

