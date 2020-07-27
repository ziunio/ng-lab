import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "loader",
    pathMatch: "full",
    loadChildren: () =>
      import("./loader/loader.module").then((m) => m.LoaderModule),
  },
  {
    path: "three-js",
    pathMatch: "full",
    loadChildren: () =>
      import("./three-js/three-js.module").then((m) => m.ThreeJsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
