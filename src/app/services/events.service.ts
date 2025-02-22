import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from './event.module';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventsUrl = 'http://localhost:3000/events';


  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }
  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.eventsUrl}/${eventId}`);
  }

}
