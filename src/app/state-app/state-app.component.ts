import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {StateService} from "../Service/state.service";
import {State} from "../Model/State";
@Component({
  selector: 'app-state-app',
  templateUrl: './state-app.component.html',
  styleUrls: ['./state-app.component.css']
})
export class StateAppComponent implements OnInit {
  public states: State[] | undefined;
  public updateState : State | undefined;
  public deleteState : State | undefined;

  constructor(private stateService: StateService) {

  }

  ngOnInit(): void {
    this.getAllStates();
  }
  public getAllStates(): void {
    this.stateService.getStates().subscribe({
      next:(response: State[]) => {
        this.states = response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string,state?: State,): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addStateModal');
    }
    else{
      if(mode === 'edit'){
        this.updateState = state;
        button.setAttribute('data-target', '#editStateModal');
      }
      else{
        this.deleteState = state;
        button.setAttribute('data-target', '#deleteStateModal');
      }
    }
    container!.appendChild(button);
    button.click();
  }
  public onAddState(addForm : NgForm): void{
    // @ts-ignore
    document.getElementById('add-state-form').click();
    console.log("addForm:" + addForm.value);
    this.stateService.addState(addForm.value).subscribe({
      next:(responce: State) => {
        console.log(responce);
        this.getAllStates();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  public onUpdateState(state : State): void{
    console.log(state);
    this.stateService.updateState(state).subscribe({
      next:(responce: State) => {
        console.log(responce);
        this.getAllStates();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  public onDeleteState(id : number): void{
    this.stateService.deleteState(id).subscribe({
      next:(responce: void) => {
        console.log(responce);
        this.getAllStates();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }

  public searchState(key : string): void{
    const result: State[] = [];
    // @ts-ignore
    for (const state of this.states){
      if(state.stateName.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        result.push(state);
      }
    }
    this.states = result;
    if(result.length === 0 || !key){
      this.getAllStates();
    }
  }


}
