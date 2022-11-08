import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../../service/localstorage-service";
import {UserService} from "../../service/user-service";
import {RemoveConfirmationDialogComponent} from "../../dialog/remove-confirmation-dialog/remove-confirmation-dialog.component";
import {User} from "../../model/user";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'delete'];
  dataSource = new MatTableDataSource<User>([]);

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    let companyId = this.localStorageService.getCompanyId();
    this.userService.getAllForCompanyId(companyId).subscribe(userArray => {
      if (userArray) {
        this.dataSource = new MatTableDataSource(userArray);
      }
    })
  }

  deleteUser(user: User): void {
    this.openRemoveDialog(user);
  }

  openRemoveDialog(user: User) {
    const title = 'User ' + user.firstName;
    const dialogRef = this.dialog.open(RemoveConfirmationDialogComponent, {
      width: '30%',
      height: '20%',
      minHeight: 170, // assumes px
      data: {
        title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.userService.deleteById(user.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(p => p.id === user.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.showSuccess(user.firstName);
          },
          () => this.showFailure(user.firstName)
        );
      }
    });
  }

  showSuccess(userName: string) {
    this.toastr.success('User `' + userName + '` was deleted', 'User delete');
  }

  showFailure(userName: string) {
    this.toastr.error('User `' + userName + '` was not deleted', 'User delete');
  }

}
