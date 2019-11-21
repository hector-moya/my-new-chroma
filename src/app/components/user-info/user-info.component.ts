import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../user.service';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  users: User[];

  
  errorMessage: string;
  isLoading: boolean = true;

  displayedColumns: string[] = ['userName', 'userSurname', 'roleName', 'created_at'];
  
  constructor(private userService: UserService, private oktaAuth: OktaAuthService ) { }

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

}
