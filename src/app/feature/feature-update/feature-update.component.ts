import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Feature} from "../../model/feature";
import {Location} from "@angular/common";
import {FeatureService} from "../../service/feature-service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../service/localstorage-service";
import {Project} from "../../model/project";
import {StatusService} from "../../service/status-service";
import {Status} from "../../model/status";

@Component({
  selector: 'app-feature-update',
  templateUrl: './feature-update.component.html',
  styleUrls: ['./feature-update.component.css']
})
export class FeatureUpdateComponent implements OnInit {

  statusList: Status [] = [];
  formControlGroup: FormGroup;
  currentFeatureId: number;
  currentFeatureStatusId: number;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private featureService: FeatureService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService,
              private statusService: StatusService) {
    this.formControlGroup = this.formBuilder.group({
      'title': new FormControl(),
      'description': new FormControl(),
      'status': new FormControl(),
      'priority': new FormControl(),
      'estimation': new FormControl(),
      'user': new FormControl()
    });
  }

  ngOnInit(): void {
    this.fetchStatusList();
    const featureId = this.route.snapshot.params['id'];
    this.featureService.getById(featureId).subscribe(feature => {
      if (feature) {
        this.currentFeatureId = feature.id;
        this.currentFeatureStatusId = feature.status.id;
        this.formControlGroup = this.formBuilder.group({
          'title': new FormControl(feature.title),
          'description': new FormControl(feature.description),
          'status': new FormControl(feature.status),
          'priority': new FormControl(),
          'estimation': new FormControl(),
          'user': new FormControl()
        });
      }
    })

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
    feature.id = this.currentFeatureId;
    feature.title = this.formControlGroup.controls['title'].value;
    feature.description = this.formControlGroup.controls['description'].value;

    // adding status
    let statusId = this.formControlGroup.controls['status'].value;
    let featureStatus = new Status();
    featureStatus.id = statusId;
    feature.status = featureStatus;

    // adding project
    let project = new Project();
    project.id = this.localStorageService.getProjectId();
    feature.project = project;

    this.featureService.update(feature).subscribe((savedFeature) => {
      if (savedFeature) {
        this.showSuccess(savedFeature.title);
      }
    });
  }

  showSuccess(featureName: string) {
    this.toastr.success('Feature `' + featureName + '` was updated', 'Feature update');
  }

  goBack(): void {
    this.location.back();
  }
}
