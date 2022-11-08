import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../service/project-service";
import {Project} from "../../model/project";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmationDialogComponent} from "../../dialog/remove-confirmation-dialog/remove-confirmation-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LocalStorageService} from "../../service/localstorage-service";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'delete'];
  dataSource = new MatTableDataSource<Project>([]);

  constructor(private projectService: ProjectService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    let companyId = this.localStorageService.getCompanyId();
    this.projectService.getAllForCompanyId(companyId).subscribe(projectArray => {
      if (projectArray) {
        this.dataSource = new MatTableDataSource(projectArray);
      }
    })
  }

  deleteProject(project: Project): void {
    this.openRemoveDialog(project);
  }

  openRemoveDialog(project: Project) {
    const title = 'Project ' + project.name;
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
        this.projectService.deleteById(project.id).subscribe(
          () => {
            const index = this.dataSource.data.findIndex(p => p.id === project.id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.showSuccess(project.name);
          },
          () => this.showFailure(project.name)
        );
      }
    });
  }

  showSuccess(projectName: string) {
    this.toastr.success('Project `' + projectName + '` was deleted', 'Project delete');
  }

  showFailure(projectName: string) {
    this.toastr.error('Project `' + projectName + '` was not deleted', 'Project delete');
  }
}
