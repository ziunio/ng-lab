import {
  combineLatest,
  concat,
  Observable,
  of,
  Operator,
  OperatorFunction,
  Subscriber,
} from "rxjs";
import { map, pluck, switchMap, shareReplay } from "rxjs/operators";

export interface LoadablePayload<T> {
  type: "start" | "finish" | string;
  value?: T;
}

export const startLoader = () => {
  return of({ type: "start" });
};

export const loadableResult: (
  param: Observable<any>
) => Observable<LoadablePayload<any>> = (asyncResultFn) => {
  return concat(
    startLoader(),
    asyncResultFn.pipe(map((value) => ({ type: "finish", value })))
  );
};

export const combineLoadables = (
  loadables$: Observable<LoadablePayload<any>>[]
) => {
  return combineLatest(loadables$).pipe(
    map((loadables) => {
      const isLoading: boolean = !!loadables.find(
        (loadable) => loadable.type === "start"
      );
      return {
        type: isLoading ? "start" : "finish",
        value: loadables.map((loadable) => loadable.value),
      };
    })
  );
};

export function valueOperation<T extends LoadablePayload<V>, V>(
  operation: OperatorFunction<any, any>
): OperatorFunction<T, T> {
  return function mapOperation(source$: Observable<T>): Observable<T> {
    return source$.pipe(
      pluck("value"),
      operation,
      switchMap((value) =>
        source$.pipe(map((source) => ({ ...source, value })))
      ),
      shareReplay(1)
    );
  };
}
