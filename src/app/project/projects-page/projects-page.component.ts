import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project-service";
import {Project} from "../../model/project";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'delete'];
  dataSource: Project[] = [];

  constructor(private projectService: ProjectService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.projectService.getAllForCompanyId(1).subscribe(projectArray => {
      if (projectArray) {
        this.dataSource = projectArray;
      }
    })
  }

  deleteProject(project: Project): void {
    this.projectService.deleteById(project.id).subscribe(() => {
      this.showSuccess(project.name)
    });
  }

  showSuccess(projectName: string) {
    this.toastr.success('Project `' + projectName + '` was deleted', 'Project delete');
  }
}
