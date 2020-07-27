import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WithLoadingPipe } from "./with-loading.pipe";
import { LoaderWrapperComponent } from "./loader-wrapper/loader-wrapper.component";
import { LoaderRoutingModule } from "./loader-routing.module";

@NgModule({
  declarations: [WithLoadingPipe, LoaderWrapperComponent],
  exports: [WithLoadingPipe],
  imports: [CommonModule, LoaderRoutingModule],
})
export class LoaderModule {}
