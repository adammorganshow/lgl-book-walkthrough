import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventGuard } from './event.guard';

class RouterStub {
  navigateByUrl(url) { return url; }
}

describe('EventGuard', () => {
  describe('canActivate', () => {
    let eventGuard, eventsService, router;

    it('should return true if the current user is the creator ' +
      'for the requested event', () => {
      class EventsService {
        get() { return Observable.of(true); }
        isEventCreator() { return true; }
      }
      const routeSnapshot = { params: { id: '5a55135639fbc4ca3ee0ce5a' } };

      router = new RouterStub();
      eventsService = new EventsService();
      eventGuard = new EventGuard(eventsService, router);

      eventGuard.canActivate(routeSnapshot).subscribe(res => {
        expect(res).toEqual(true);
      });
    });

    it('should navigate to /events if the current user is not ' +
      'the creator for the requested event', () => {
      class EventsService {
        get() { return Observable.of(true); }
        isEventCreator() { return false; }
      }
      const routeSnapshot = { params: { id: '5a55135639fbc4ca3ee0ce5a' } };

      router = new RouterStub();
      eventsService = new EventsService();
      eventGuard = new EventGuard(eventsService, router);
      spyOn(router, 'navigateByUrl');

      eventGuard.canActivate(routeSnapshot).subscribe(res => {
        expect(res).toEqual(false);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/events');
      });
    });
  });
});