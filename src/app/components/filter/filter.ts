import { Component, EventEmitter, model, Output} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule
  ]
})
export class FilterComponent {

  filter = model('');

  @Output() filterChange = new EventEmitter<string>();

  onFilterChange() {
    this.filterChange.emit(this.filter());
  }
}
