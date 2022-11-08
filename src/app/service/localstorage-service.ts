import {Inject, Injectable, InjectionToken} from '@angular/core';
import {StorageService} from "ngx-webstorage-service";

export const LOCAL_STORAGE_SERVICE = new InjectionToken<StorageService>('LOCAL_STORAGE_SERVICE');

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE_SERVICE) private storage: StorageService) {
  }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  get(key: string): any {
    return this.storage.get(key);
  }

  getCompanyId(): any {
    return this.get("CompanyId");
  }

  setCompanyId(id: number): any {
    return this.set("CompanyId", id);
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}
