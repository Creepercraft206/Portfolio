import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  imprintModalOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  privacyModalOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
}
