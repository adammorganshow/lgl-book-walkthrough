import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { format } from 'date-fns';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>('http://localhost:8080/api/events', event);
  }

  getUserEvents(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:8080/api/events/user/' +
                                  userId);
  }

  get(id: string): Observable<Event> {
    return this.http.get<Event>('http://localhost:8080/api/events/' + id)
      .map((res: Event) => this.formatDateTime(res));
  }

  all(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:8080/api/events');
  }

  subscribe(eventId: string, user: object): Observable<Event> {
    return this.http.patch<Event>('http://localhost:8080/api/events/' +
                                  eventId + '/subscribe', user);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>('http://localhost:8080/api/events/' +
                                  event._id, event);
  }

  formatDateTime(event: Event): Event {
    event.displayStart = format(event.startTime, 'dddd MMM, Do - h:mm A');
    event.displayEnd = format(event.endTime, 'dddd MMM, Do - h:mm A');
    return event;
  }

  isEventCreator(creatorId: string): boolean {
    const user = this.authService.currentUser();
    return user._id === creatorId ? true : false;
  }

}
