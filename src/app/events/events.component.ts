import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { Event } from '../services/event.module';
import { PaginationComponent } from '../shared/pagination.component';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [CommonModule, PaginationComponent],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  //Paginação
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
        this.totalItems = data.length; 
        this.events = data.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
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
    this.loadEvents();
  }
}
