import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoaderWrapperComponent } from "./loader-wrapper/loader-wrapper.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoaderWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoaderRoutingModule {}
