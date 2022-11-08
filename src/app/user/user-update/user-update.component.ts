import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {UserService} from "../../service/user-service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../service/localstorage-service";
import {User} from "../../model/user";
import {Company} from "../../model/company";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  currentUser: User;
  formControlGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private userService: UserService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService) {
    this.formControlGroup = this.formBuilder.group({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'email': new FormControl()
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.userService.getById(projectId).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.formControlGroup = this.formBuilder.group({
          'firstName': new FormControl(user.firstName),
          'lastName': new FormControl(user.lastName),
          'email': new FormControl(user.email)
        });
      }
    })
  }


  onSave(): void {
    let user: User = new User();
    user.id = this.currentUser.id;
    user.firstName = this.formControlGroup.controls['firstName'].value;
    user.lastName = this.formControlGroup.controls['lastName'].value;
    user.email = this.formControlGroup.controls['email'].value;
    let company = new Company();
    company.id = this.localStorageService.getCompanyId();
    user.company = company;

    this.userService.update(user).subscribe((user) => {
      if (user) {
        this.showSuccess(user.firstName);
      }
    });
  }

  showSuccess(userName: string) {
    this.toastr.success('User `' + userName + '` was created', 'User add');
  }

  goBack(): void {
    this.location.back();
  }
}
