import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventModel } from './event.module';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  API_URL(API_URL: any) {
    throw new Error('Method not implemented.');
  }
  private eventsUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.eventsUrl);
  }

  getEventById(eventId: string): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.eventsUrl}/${eventId}`);
  }

  updateEvent(event: EventModel): Observable<void> {
    return this.http.put<void>(`${this.eventsUrl}/${event.id}`, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.eventsUrl}/${eventId}`);
  }
}
