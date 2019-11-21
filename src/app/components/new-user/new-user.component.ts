import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User, UserService } from '../../user.service';
import { Role, RolesService } from '../../roles.service';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  roles: Role[];

  errorMessage: string;


  errors: string = '';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private oktaAuth: OktaAuthService
  ) { }

  @Output()
  userAdded: EventEmitter<User> = new EventEmitter<User>();

  async ngOnInit() {
    await this.oktaAuth.getAccessToken();
    this.getRoles();

  }

  // Get Grades

  getRoles() {
    this.rolesService
      .getRoles()
      .subscribe(
        roles => this.roles = roles,
        error => this.errorMessage = <any>error
      );
  }
  findGrade(roleName): Role {
    return this.roles.find(role => role.roleName === roleName);
  }

  addUser(name) {
    this.isLoading = true;
    this.userService
      .addUser({
        name: name
      })
      .subscribe(
        user => {
          this.isLoading = false;
          user.isUpdating = false;
          this.userAdded.emit(user);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }

}
