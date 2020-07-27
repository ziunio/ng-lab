import { Injectable } from "@angular/core";
import { of, ReplaySubject } from "rxjs";
import { delay, switchMap, shareReplay, map } from "rxjs/operators";
import { PRODUCTS, CATEGORIES } from "./products-mock";
import {
  loadableResult,
  combineLoadables,
  valueOperation,
} from "./loadable-utils";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  public structuredProducts$;
  public products$;
  public categories$;
  public asyncAction$;

  private fetchProductsAction: ReplaySubject<void> = new ReplaySubject(1);
  private fetchCategoriesAction: ReplaySubject<void> = new ReplaySubject(1);

  constructor() {
    this.products$ = this.fetchProductsAction.pipe(
      switchMap(() => loadableResult(this.getProducts())),
      shareReplay(1)
    );
    this.categories$ = this.fetchCategoriesAction.pipe(
      switchMap(() => loadableResult(this.getCategories())),
      shareReplay(1)
    );
    this.structuredProducts$ = combineLoadables([
      this.products$,
      this.categories$,
    ]).pipe(
      valueOperation(
        map(([products, categories]) => ({ products, categories }))
      )
    );
  }

  fetchProducts() {
    this.fetchProductsAction.next();
  }
  fetchCategories() {
    this.fetchCategoriesAction.next();
  }

  getProducts() {
    return of(PRODUCTS).pipe(delay(1000));
  }

  getCategories() {
    return of(CATEGORIES).pipe(delay(2000));
  }
}
