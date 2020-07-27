import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThreeJsRoutingModule } from "./three-js-routing.module";
import { ThreeWrapperComponent } from "./three-wrapper/three-wrapper.component";
import { AtftModule } from "atft";
import { MeshComponent } from "./components/mesh/mesh.component";
import { ObjectComponent } from "./components/object/object.component";

@NgModule({
  declarations: [ThreeWrapperComponent, MeshComponent, ObjectComponent],
  imports: [CommonModule, ThreeJsRoutingModule, AtftModule],
})
export class ThreeJsModule {}
