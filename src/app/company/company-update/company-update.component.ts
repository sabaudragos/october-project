import { Component, OnInit } from '@angular/core';
import {Company} from "../../model/company";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {CompanyService} from "../../service/company-service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit {
  formControlGroup: FormGroup;
  private currentCompany: Company;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private companyService: CompanyService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    this.formControlGroup = this.formBuilder.group({
      'name': new FormControl(""),
      'address': new FormControl(""),
      'city': new FormControl(""),
      'country': new FormControl(""),
      'email': new FormControl(""),
      'phone': new FormControl(""),
      'registrationNumber': new FormControl(""),
      'vatNumber': new FormControl(""),
    });
  }

  ngOnInit(): void {
    const companyId = this.route.snapshot.params['id'];
    this.companyService.getById(companyId).subscribe(company => {
      if (company) {
        this.currentCompany = company;
        this.formControlGroup = this.formBuilder.group({
          'name': new FormControl(company.name),
          'address': new FormControl(company.address),
          'city': new FormControl(company.city),
          'country': new FormControl(company.country),
          'email': new FormControl(company.email),
          'phone': new FormControl(company.phone),
          'registrationNumber': new FormControl(company.registrationNumber),
          'vatNumber': new FormControl(company.vatNumber),
        });
      }
    })
  }


  goBack(): void {
    this.location.back();
  }

  onSave(): void {
    let company: Company = new Company();
    company.id = this.currentCompany.id;
    company.name = this.formControlGroup.controls['name'].value;
    company.address = this.formControlGroup.controls['address'].value;
    company.city = this.formControlGroup.controls['city'].value;
    company.country = this.formControlGroup.controls['country'].value;
    company.email = this.formControlGroup.controls['email'].value;
    company.phone = this.formControlGroup.controls['phone'].value;
    company.registrationNumber = this.formControlGroup.controls['registrationNumber'].value;
    company.vatNumber = this.formControlGroup.controls['vatNumber'].value;

    this.companyService.update(company).subscribe((company) => {
      if(company) {
        this.showSuccess(company.name);
      }
    });
  }

  showSuccess(companyName: string) {
    this.toastr.success('Company ' + companyName + " was updated", 'Company update');
  }
}
