import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { Event } from '../services/event.module';
import { PaginationComponent } from '../shared/pagination.component';
import { SearchComponent } from '../shared/search.component';
import { TruncatePipe } from "../shared/truncate.pipe";

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [CommonModule, PaginationComponent, SearchComponent, TruncatePipe],
})
export class EventsComponent implements OnInit {
  events: Event[] = []; //muda o estado conforme paginação e filtro
  allEvents: Event[] = [];

  //Search
  searchQuery = '';

  //Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;

  private eventsService = inject(EventsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit() {
    console.log('Acesso Events');
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe(
      (data) => {
        this.allEvents = data;
        this.applyFilter();
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }
  
  applyFilter() {
    let filteredEvents = this.allEvents;

    if (this.searchQuery.length >= 3) {
      filteredEvents = this.allEvents.filter((event) =>
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.totalItems = filteredEvents.length;
    this.events = filteredEvents.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  
  onSearchChange(searchValue: string) {
    this.searchQuery = searchValue;
    this.applyFilter();
  }

  editEvent(eventId: number) {
    this.router.navigate([`/event/${eventId}`]);
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
    this.eventsService.deleteEvent(eventId).subscribe(
      () => {
        console.log(`Evento com ID ${eventId} excluído com sucesso.`);
        this.loadEvents();
        this.toastr.success('Evento excluído com sucesso!');
      },
      (error) => {
        console.error('Erro ao excluir evento:', error);
      this.toastr.error('Erro ao excluir evento!', 'Erro');
      }
    );
  }

  changePage(page: number) {
    this.currentPage = page;
    this.applyFilter();
  }
}
