import { Component, OnInit } from '@angular/core';
import {Users} from "../Model/Users";
import {UserService} from "../Service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  public users: Users[] = [];
  public updateUser : Users | undefined;
  public deleteUser : Users | undefined;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  public getAllUsers(): void {
    this.userService.getUsers().subscribe({
      next:(response: Users[]) => {
        this.users = response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string,user?: Users): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addUserModal');
    }
    else{
      if(mode === 'edit'){
        this.updateUser = user;
        button.setAttribute('data-target', '#editUserModal');
      }
      else{
        this.deleteUser = user;
        button.setAttribute('data-target', '#deleteUserModal');
      }
    }
    container!.appendChild(button);
    button.click();
  }
  public onAddUser(addForm : NgForm): void{
    // @ts-ignore
    document.getElementById('add-user-form').click();
    console.log("addForm:" + addForm.value);
    this.userService.addUser(addForm.value).subscribe({
      next:(responce: Users) => {
        console.log(responce);
        this.getAllUsers();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    });
  }
  public onUpdateUser(user : Users): void{
    this.userService.updateUser(user).subscribe({
      next:(responce: Users) => {
        console.log(responce);
        this.getAllUsers();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    });
  }
  public onDeleteUser(id : number): void{
    this.userService.deleteUser(id).subscribe({
      next:(responce: void) => {
        console.log(responce);
        this.getAllUsers();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    });
  }

  public searchUsers(key : string): void{
    const result: Users[] = [];
    // @ts-ignore
    for (const user of this.users){
      if(user.nickname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.adminRights.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(user);
      }
    }
    this.users = result;
    if(result.length === 0 || !key){
      this.getAllUsers();
    }
  }
}
