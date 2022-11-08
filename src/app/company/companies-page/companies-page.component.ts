import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from "../../service/company-service";
import {Company} from "../../model/company";
import {ToastrService} from "ngx-toastr";
import {RemoveConfirmationDialogComponent} from "../../dialog/remove-confirmation-dialog/remove-confirmation-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LocalStorageService} from "../../service/localstorage-service";

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'city', 'country', 'delete'];
  dataSource = new MatTableDataSource<Company>([]);

  constructor(private companyService: CompanyService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.companyService.getAll().subscribe(companyArray => {
      if (companyArray) {
        this.dataSource = new MatTableDataSource(companyArray);
      }
    })
  }

  deleteCompany(company: Company): void {
    this.openRemoveDialog(company);
  }

  openRemoveDialog(company: Company) {
    const title = 'Company ' + company.name;
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
        this.companyService.deleteById(company.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(p => p.id === company.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.showSuccess(company.name);
          },
          () => this.showFailure(company.name)
        );
      }
    });
  }

  showSuccess(companyName: string) {
    this.toastr.success('Company `' + companyName + '` was deleted', 'Company delete');
  }

  showFailure(companyName: string) {
    this.toastr.error('Company `' + companyName + '` was not deleted', 'Company delete');
  }

}
