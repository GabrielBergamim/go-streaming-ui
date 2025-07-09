import { Component, EventEmitter, model, Output} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  imports: [FormsModule]
})
export class FilterComponent {

  filter = model('');

  @Output() filterChange = new EventEmitter<string>();

  onFilterChange() {
    this.filterChange.emit(this.filter());
  }
}
