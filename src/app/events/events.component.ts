import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { EventModel } from '../services/event.module';
import { PaginationComponent } from '../shared/pagination.component';
import { SearchComponent } from '../shared/search.component';
import { TruncatePipe } from '../shared/truncate.pipe';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [CommonModule, PaginationComponent, SearchComponent, TruncatePipe],
})
export class EventsComponent implements OnInit {
  private reload$ = new BehaviorSubject<void>(undefined);
  events$!: Observable<EventModel[]>; 
  isTableView = false;
  searchQuery = '';

  //Config Page
  currentPage = 1;
  itemsPerPage = 6;

  private eventsService = inject(EventsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit() {
    console.log('Acesso Events');
    this.loadEvents();
  }

  loadEvents() {
    this.events$ = this.eventsService.getEvents().pipe(
      map((events) =>
        events.filter((event) =>
          event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        ).slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      )
    );
  }

  onSearchChange(searchValue: string) {
    this.searchQuery = searchValue;
    this.loadEvents(); 
  }

  editEvent(eventId: number) {
    this.router.navigate([`/event/edit/${eventId}`]);
  }

  confirmDelete(eventId: number, eventTitle: string) {
    const confirmDelete = confirm(
      `Você deseja mesmo excluir o evento "${eventTitle}"?`
    );
    if (confirmDelete) {
      this.deleteEvent(eventId);
    }
  }

  deleteEvent(eventId: number) {
    this.eventsService.deleteEvent(eventId).pipe(
      tap(() => {
        this.loadEvents(); 
        this.toastr.success('Evento excluído com sucesso!');
        this.reload$.next();
      }),
      tap({
        error: (error) => {
          this.toastr.error('Erro ao excluir evento!', 'Erro');
        }
      })
    ).subscribe();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadEvents();
  }

  toggleView() {
    this.isTableView = !this.isTableView;
  }
}
