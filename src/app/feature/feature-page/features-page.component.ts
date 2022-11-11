import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Feature} from "../../model/feature";
import {FeatureService} from "../../service/feature-service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../../service/localstorage-service";
import {RemoveConfirmationDialogComponent} from "../../dialog/remove-confirmation-dialog/remove-confirmation-dialog.component";

@Component({
  selector: 'app-feature-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.css']
})
export class FeaturesPageComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'project', 'delete'];
  dataSource = new MatTableDataSource<Feature>([]);

  constructor(private featureService: FeatureService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    let projectId = this.localStorageService.getProjectId();
    this.featureService.getAllByProjectId(projectId).subscribe(featureArray => {
      if (featureArray) {
        this.dataSource = new MatTableDataSource(featureArray);
      }
    })
  }

  deleteFeature(feature: Feature): void {
    this.openRemoveDialog(feature);
  }

  openRemoveDialog(feature: Feature) {
    const title = 'Feature ' + feature.title;
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
        this.featureService.deleteById(feature.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(p => p.id === feature.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.showSuccess(feature.title);
          },
          () => this.showFailure(feature.title)
        );
      }
    });
  }

  showSuccess(featureName: string) {
    this.toastr.success('Feature `' + featureName + '` was deleted', 'Feature delete');
  }

  showFailure(featureName: string) {
    this.toastr.error('Feature `' + featureName + '` was not deleted', 'Feature delete');
  }

}
