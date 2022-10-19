import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from '@angular/common';
import {CompanyService} from "../../service/company-service";
import {Company} from "../../model/company";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  formControlGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private companyService: CompanyService,
              private toastr: ToastrService) {
    this.formControlGroup = this.formBuilder.group({
      'name': new FormControl(),
      'address': new FormControl(),
      'city': new FormControl(),
      'country': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'registrationNumber': new FormControl(''),
      'vatNumber': new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  onSave(): void {
    let company: Company = new Company();
    company.name = this.formControlGroup.controls['name'].value;
    company.address = this.formControlGroup.controls['address'].value;
    company.city = this.formControlGroup.controls['city'].value;
    company.country = this.formControlGroup.controls['country'].value;
    company.email = this.formControlGroup.controls['email'].value;
    company.phone = this.formControlGroup.controls['phone'].value;
    company.registrationNumber = this.formControlGroup.controls['registrationNumber'].value;
    company.vatNumber = this.formControlGroup.controls['vatNumber'].value;

    this.companyService.create(company).subscribe((company) => {
      if(company) {
        console.log("A new company has been created: ", company);
        this.showSuccess(company.name);
      }
    });
  }

  showSuccess(companyName: string) {
    this.toastr.success('Company ' + companyName + " was created", 'Company add');
  }

}
