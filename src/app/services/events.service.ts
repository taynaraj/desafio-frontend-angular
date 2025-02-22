import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from './event.module';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventsUrl = 'assets/data/eventos.json';
  private events: Event[] = [];

  constructor(private http: HttpClient) {}

  getEvents(): Observable<{ events: Event[] }> {
    if (this.events.length) {
      return of({ events: this.events });
    }
    return this.http.get<{ events: Event[] }>(this.eventsUrl);
  }

  updateEvents(updatedEvents: Event[]) {
    this.events = updatedEvents;
  }
}
