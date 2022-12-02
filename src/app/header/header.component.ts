import {Component, OnInit} from '@angular/core';
import {SideNavService} from "../service/side-nav-service";
import {Company} from "../model/company";
import {CompanyService} from "../service/company-service";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
import {MatSelectChange} from "@angular/material/select";
import {LocalStorageService} from "../service/localstorage-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideNavOn = false;
  companies: Company [] = [];
  selected: Company = new Company();

  constructor(private sideNavService: SideNavService,
              private companyService: CompanyService,
              private localStorageService: LocalStorageService) {
    sideNavService.sideNavOn.subscribe(isSideNavOn => this.isSideNavOn = isSideNavOn);
  }

  ngOnInit() {
    this.companyService.getAll().subscribe(
      (result: Company[]) => {
        if (result) {
          this.companies = result;
        }
      }
    )
    ;
  }

  openSideNav() {
    this.isSideNavOn = !this.isSideNavOn;
    this.sideNavService.announceSideNavOn(this.isSideNavOn);
  }

  onChange(event: MatSelectChange) {
    console.log("Comapny name=", event.value);
    this.localStorageService.setCompanyId(event.value);
  }

}
