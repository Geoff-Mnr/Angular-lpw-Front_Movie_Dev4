import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { Director } from "../../models/director.interface";
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";

@Component({
  selector: "app-add-edit-form-director",
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: "./add-edit-form-director.component.html",
  styleUrl: "./add-edit-form-director.component.scss",
  providers: [DatePipe],
})
export class AddEditFormDirectorComponent {
  @Output() addEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();

  @Input() selectedDirector: Director = {
    id: 0,
    name: "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  fb = inject(FormBuilder);

  form = this.fb.group({
    name: ["", Validators.required],
  });

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date) {
    return this.datePipe.transform(date, "HH:mm le dd-MM-yyyy");
  }

  ngOnInit() {
    this.selectedDirector = this.clone(this.selectedDirector);
  }

  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }

  addDirector() {
    this.addEmitter.emit(this.selectedDirector);
  }

  editDirector() {
    const director = this.clone(this.selectedDirector);
    this.editEmitter.emit(director);
  }

  closeForm() {
    this.closeEmitter.emit();
  }
}
