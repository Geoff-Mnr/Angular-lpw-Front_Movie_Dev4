import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllMoviesComponent } from './list-all-movies.component';

describe('ListAllMoviesComponent', () => {
  let component: ListAllMoviesComponent;
  let fixture: ComponentFixture<ListAllMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAllMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
