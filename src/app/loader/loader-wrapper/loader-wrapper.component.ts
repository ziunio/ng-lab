import { Component } from "@angular/core";
import { ProductsService } from "../products-service";

@Component({
  selector: "app-loader-wrapper",
  templateUrl: "./loader-wrapper.component.html",
  styleUrls: ["./loader-wrapper.component.scss"],
})
export class LoaderWrapperComponent {
  public products$;
  public categories$;
  public structuredProducts$;

  constructor(public productsService: ProductsService) {
    this.products$ = this.productsService.products$;
    this.categories$ = this.productsService.categories$;
    this.structuredProducts$ = this.productsService.structuredProducts$;
    this.productsService.fetchProducts();
    this.productsService.fetchCategories();
  }
}
