import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {ProjectService} from "../../service/project-service";
import {ToastrService} from "ngx-toastr";
import {Project} from "../../model/project";
import {ActivatedRoute} from "@angular/router";
import {Company} from "../../model/company";

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {
  formControlGroup: FormGroup ;
  private currentProject: Project;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    this.formControlGroup = this.formBuilder.group({
      'name': new FormControl(),
      'description': new FormControl()
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.projectService.getById(projectId).subscribe(project => {
      if (project) {
        this.currentProject = project;
        this.formControlGroup = this.formBuilder.group({
          'name': new FormControl(project.name),
          'description': new FormControl(project.description)
        });
      }
    })
  }


  onSave(): void {
    let project: Project = new Project();
    project.id = this.currentProject.id;
    project.name = this.formControlGroup.controls['name'].value;
    project.description = this.formControlGroup.controls['description'].value;
    let company = new Company();
    company.id = 1;
    project.company = company;

    this.projectService.update(project).subscribe((savedProject) => {
      if(savedProject) {
        this.showSuccess(savedProject.name);
      }
    });
  }

  showSuccess(projectName: string) {
    this.toastr.success('Project `' + projectName + '` was updated', 'Project update');
  }

  goBack(): void {
    this.location.back();
  }

}
