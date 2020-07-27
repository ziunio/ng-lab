import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThreeWrapperComponent } from "./three-wrapper/three-wrapper.component";
import { MeshComponent } from "./components/mesh/mesh.component";
import { ObjectComponent } from "./components/object/object.component";

const routes: Routes = [
  {
    path: "",
    component: ThreeWrapperComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: MeshComponent,
      },
      {
        path: "object",
        component: ObjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeJsRoutingModule {}
