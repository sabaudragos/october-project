import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyAddComponent} from "./company/company-add/company-add.component";
import {CompaniesPageComponent} from "./company/companies-page/companies-page.component";
import {CompanyUpdateComponent} from "./company/company-update/company-update.component";

const routes: Routes = [
  {path: 'company/add', component: CompanyAddComponent},
  {path: 'company/:id/update', component: CompanyUpdateComponent},
  {path: 'companies', component: CompaniesPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
