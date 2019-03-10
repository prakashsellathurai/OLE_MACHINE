import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivechartPage } from './livechart.page';

describe('LivechartPage', () => {
  let component: LivechartPage;
  let fixture: ComponentFixture<LivechartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivechartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivechartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
