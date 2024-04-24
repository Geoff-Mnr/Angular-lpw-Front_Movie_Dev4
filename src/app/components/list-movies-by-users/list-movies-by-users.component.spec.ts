import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoviesByUsersComponent } from './list-movies-by-users.component';

describe('ListMoviesByUsersComponent', () => {
  let component: ListMoviesByUsersComponent;
  let fixture: ComponentFixture<ListMoviesByUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMoviesByUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMoviesByUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
