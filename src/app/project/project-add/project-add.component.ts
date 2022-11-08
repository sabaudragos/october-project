import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {ProjectService} from "../../service/project-service";
import {ToastrService} from "ngx-toastr";
import {Project} from "../../model/project";
import {Company} from "../../model/company";
import {LocalStorageService} from "../../service/localstorage-service";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  formControlGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private projectService: ProjectService,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService) {
    this.formControlGroup = this.formBuilder.group({
      'name': new FormControl(),
      'description': new FormControl()
    });
  }

  ngOnInit(): void {
  }


  onSave(): void {
    let project: Project = new Project();
    project.name = this.formControlGroup.controls['name'].value;
    project.description = this.formControlGroup.controls['description'].value;
    let company = new Company();
    company.id = this.localStorageService.getCompanyId();
    project.company = company;

    this.projectService.create(project).subscribe((project) => {
      if (project) {
        console.log("A new project has been created: ", project);
        this.showSuccess(project.name);
      }
    });
  }

  showSuccess(projectName: string) {
    this.toastr.success('Project `' + projectName + '` was created', 'Project add');
  }

  goBack(): void {
    this.location.back();
  }
}
