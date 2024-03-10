import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Movie } from "../../models/movie.interface";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe, formatDate } from "@angular/common";

@Component({
  selector: "app-add-edit-form",
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: "./add-edit-form.component.html",
  styleUrl: "./add-edit-form.component.scss",
})
export class AddEditFormComponent {
  @Output() addEmitter = new EventEmitter<Movie>();
  @Output() editEmitter = new EventEmitter<Movie>();

  @Input() selectedMovie: Movie = {
    id: 0,
    title: "",
    year: 0,
    director: "",
    synopsis: "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  ngOnInit() {
    this.selectedMovie = this.clone(this.selectedMovie);
  }

  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }

  addMovie() {
    const toSend = this.clone(this.selectedMovie);
    this.addEmitter.emit(toSend);
  }

  editMovie() {
    const toSend = this.clone(this.selectedMovie);
    this.editEmitter.emit(toSend);
  }
}
