import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThreeJsRoutingModule } from "./three-js-routing.module";
import { ThreeWrapperComponent } from "./three-wrapper/three-wrapper.component";
import { AtftModule } from "atft";

@NgModule({
  declarations: [ThreeWrapperComponent],
  imports: [CommonModule, ThreeJsRoutingModule, AtftModule],
})
export class ThreeJsModule {}
