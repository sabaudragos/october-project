import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../service/company-service";
import {Company} from "../../model/company";

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email','city', 'country'];
  dataSource: Company[] = [];

  constructor(private companyService: CompanyService,) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe(companyArray => {
      if (companyArray) {
        this.dataSource = companyArray;
      }
    })
  }

}
