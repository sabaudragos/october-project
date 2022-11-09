import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SideNavService {

  constructor() {
  }

  // Observable string sources
  private sideNavOnAnnouncedSource = new Subject<boolean>();

  // Observable string streams
  sideNavOn = this.sideNavOnAnnouncedSource.asObservable();

  // Service message commands
  announceSideNavOn(sideNavOn: boolean) {
    this.sideNavOnAnnouncedSource.next(sideNavOn);
  }
}
