import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ThreeWrapperComponent } from "./three-wrapper.component";

describe("ThreeWrapperComponent", () => {
  let component: ThreeWrapperComponent;
  let fixture: ComponentFixture<ThreeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
