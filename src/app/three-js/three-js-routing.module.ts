import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThreeWrapperComponent } from "./three-wrapper/three-wrapper.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ThreeWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeJsRoutingModule {}
