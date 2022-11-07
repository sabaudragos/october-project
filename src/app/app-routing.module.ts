import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyAddComponent} from "./company/company-add/company-add.component";
import {CompaniesPageComponent} from "./company/companies-page/companies-page.component";
import {CompanyUpdateComponent} from "./company/company-update/company-update.component";
import {ProjectAddComponent} from "./project/project-add/project-add.component";
import {ProjectUpdateComponent} from "./project/project-update/project-update.component";
import {ProjectsPageComponent} from "./project/projects-page/projects-page.component";

const routes: Routes = [
  {path: 'company/add', component: CompanyAddComponent},
  {path: 'company/:id/update', component: CompanyUpdateComponent},
  {path: 'companies', component: CompaniesPageComponent},
  {path: 'project/add', component: ProjectAddComponent},
  {path: 'project/:id/update', component: ProjectUpdateComponent},
  {path: 'projects', component: ProjectsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
