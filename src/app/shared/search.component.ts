import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  imports: [CommonModule,FormsModule],
})
export class SearchComponent {
  searchText = '';
  
  @Output() searchChange = new EventEmitter<string>(); 

  onSearchChange() {
    if (this.searchText.length >= 3 || this.searchText.length === 0) {
      this.searchChange.emit(this.searchText);
    }
  }
}
