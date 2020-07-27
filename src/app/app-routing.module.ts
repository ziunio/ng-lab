import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "loader",
    loadChildren: () =>
      import("./loader/loader.module").then((m) => m.LoaderModule),
  },
  {
    path: "three-js",
    loadChildren: () =>
      import("./three-js/three-js.module").then((m) => m.ThreeJsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
