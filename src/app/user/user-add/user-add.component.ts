import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../service/localstorage-service";
import {User} from "../../model/user";
import {Company} from "../../model/company";
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  formControlGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private userService: UserService,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService) {
    this.formControlGroup = this.formBuilder.group({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'email': new FormControl()
    });
  }

  ngOnInit(): void {
  }


  onSave(): void {
    let user: User = new User();
    user.firstName = this.formControlGroup.controls['firstName'].value;
    user.lastName = this.formControlGroup.controls['lastName'].value;
    user.email = this.formControlGroup.controls['email'].value;
    let company = new Company();
    company.id = this.localStorageService.getCompanyId();
    user.company = company;

    this.userService.create(user).subscribe((user) => {
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
