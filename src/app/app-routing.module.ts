import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyAddComponent} from "./company/company-add/company-add.component";
import {CompaniesPageComponent} from "./company/companies-page/companies-page.component";
import {CompanyUpdateComponent} from "./company/company-update/company-update.component";
import {ProjectAddComponent} from "./project/project-add/project-add.component";
import {ProjectUpdateComponent} from "./project/project-update/project-update.component";
import {ProjectsPageComponent} from "./project/projects-page/projects-page.component";
import {UserAddComponent} from "./user/user-add/user-add.component";
import {UserUpdateComponent} from "./user/user-update/user-update.component";
import {UsersPageComponent} from "./user/users-page/users-page.component";

const routes: Routes = [
  {path: 'company/add', component: CompanyAddComponent},
  {path: 'company/:id/update', component: CompanyUpdateComponent},
  {path: 'companies', component: CompaniesPageComponent},
  {path: 'project/add', component: ProjectAddComponent},
  {path: 'project/:id/update', component: ProjectUpdateComponent},
  {path: 'projects', component: ProjectsPageComponent},
  {path: 'user/add', component: UserAddComponent},
  {path: 'user/:id/update', component: UserUpdateComponent},
  {path: 'users', component: UsersPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
