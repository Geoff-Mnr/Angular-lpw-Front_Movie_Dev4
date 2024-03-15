import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { Movie } from "../../models/movie.interface";
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";

@Component({
  selector: "app-add-edit-form",
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: "./add-edit-form.component.html",
  styleUrl: "./add-edit-form.component.scss",
  providers: [DatePipe],
})
export class AddEditFormComponent {
  @Output() addEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();

  @Input() selectedMovie: Movie = {
    id: 0,
    title: "",
    year: 0,
    director: "",
    synopsis: "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  fb = inject(FormBuilder);

  form = this.fb.group({
    title: ["", Validators.required],
    year: ["", [Validators.required, Validators.min(1896)]],
    director: ["", Validators.required],
    synopsis: ["", [Validators.required, Validators.minLength(5)]],
  });

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date) {
    return this.datePipe.transform(date, "HH:mm le dd-MM-yyyy");
  }

  /* réinitialise le formulaire */
  ngOnInit() {
    this.selectedMovie = this.clone(this.selectedMovie);
  }

  /* permet de copier un objet */
  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }

  addMovie() {
    this.addEmitter.emit(this.selectedMovie);
  }

  closeForm() {
    this.closeEmitter.emit();
  }

  /* permet d'ouvrir un formulaire pour modifier un film */
  editMovie() {
    const toSend = this.clone(this.selectedMovie);
    this.editEmitter.emit(toSend);
  }

  /* permet de fermer le formulaire */
}
