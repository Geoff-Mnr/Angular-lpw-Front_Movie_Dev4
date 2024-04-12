import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormDirectorComponent } from './add-edit-form-director.component';

describe('AddEditFormDirectorComponent', () => {
  let component: AddEditFormDirectorComponent;
  let fixture: ComponentFixture<AddEditFormDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFormDirectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFormDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
