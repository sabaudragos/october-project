import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {FeatureService} from "../../service/feature-service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../service/localstorage-service";
import {Feature} from "../../model/feature";
import {Project} from "../../model/project";
import {StatusService} from "../../service/status-service";
import {Status} from "../../model/status";

@Component({
  selector: 'app-feature-add',
  templateUrl: './feature-add.component.html',
  styleUrls: ['./feature-add.component.css']
})
export class FeatureAddComponent implements OnInit {
  statusList: Status[] = [];
  formControlGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private featureService: FeatureService,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService,
              private statusService: StatusService) {
    this.fetchStatusList();
    this.formControlGroup = this.formBuilder.group({
      'title': new FormControl(),
      'description': new FormControl(),
      'status': new FormControl(this.statusList[0]),
      'priority': new FormControl(),
      'estimation': new FormControl(),
      'user': new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  private fetchStatusList() {
    const projectId = this.localStorageService.getProjectId();
    this.statusService.getAllByProjectId(projectId).subscribe((statuses) => {
      if (statuses) {
        this.statusList = statuses;
      }
    });
  }

  onSave(): void {
    let feature: Feature = new Feature();
    feature.title = this.formControlGroup.controls['title'].value;
    feature.description = this.formControlGroup.controls['description'].value;

    // adding feature status
    let statusId = this.formControlGroup.controls['status'].value;
    let featureStatus: Status = new Status;
    featureStatus.id = statusId;
    feature.status = featureStatus;

    // adding project
    let project = new Project();
    project.id = this.localStorageService.getProjectId();
    feature.project = project;

    this.featureService.create(feature).subscribe((feature) => {
      if (feature) {
        console.log("A new feature has been created: ", feature);
        this.showSuccess(feature.title);
      }
    });
  }

  showSuccess(featureName: string) {
    this.toastr.success('Feature `' + featureName + '` was created', 'Feature add');
  }

  goBack(): void {
    this.location.back();
  }

}
