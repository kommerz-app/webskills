import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPageHeaderComponent } from './dynamic-page-header.component';

describe('DynamicPageHeaderComponent', () => {
  let component: DynamicPageHeaderComponent;
  let fixture: ComponentFixture<DynamicPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
