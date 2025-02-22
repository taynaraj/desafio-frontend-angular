import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { Event } from '../services/event.module';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [CommonModule],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  private eventsService = inject(EventsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit() {
    console.log('EventsComponent carregado!');
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data.events;
    });
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
    this.events = this.events.filter((event) => event.id !== eventId);
    this.eventsService.updateEvents(this.events);
    this.toastr.success('Evento excluído com sucesso!');
  }
}
