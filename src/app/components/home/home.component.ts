import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../user.service';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  users: User[];
  errorMessage: string;
  isLoading: boolean = true;
  demoPage: any;  // Remove after starting project

  constructor(private userService: UserService, private oktaAuth: OktaAuthService ) {
    
    // Remove after starting project
    this.demoPage = ['demo'];
  }

  async ngOnInit() {
    await this.oktaAuth.getAccessToken();
    this.getUsers();
  }
  getUsers() {
    this.userService
    .getUsers()
    .subscribe(
      users => {
        this.users = users
        this.isLoading = false
      },
      error => {
        this.errorMessage = <any>error
        this.isLoading = false
      },
    );
  }
  findUser(userID): User {
    return this.users.find(user => user.userID === userID);
  }
  isUpdating(userID): boolean {
    return this.findUser(userID).isUpdating;
  }

  //To do Delete Users
  /*deleteUser(userID) {
    let user = this.findUser(userID)
    user.isUpdating = true
    this.userService
        .deleteUser(userID)
        .subscribe(
            response => {
                let index = this.users.findIndex(user => user.userID === userID)
                this.users.splice(index, 1)
                user.isUpdating = false
            },
            error => {
                this.errorMessage = <any>error
                user.isUpdating = false
            }
        );
}*/
}
