import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirectorsComponent } from './list-directors.component';

describe('ListDirectorsComponent', () => {
  let component: ListDirectorsComponent;
  let fixture: ComponentFixture<ListDirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDirectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
