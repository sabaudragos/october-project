import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyAddComponent} from "./company/company-add/company-add.component";

const routes: Routes = [
  {path: 'companies/add', component: CompanyAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
