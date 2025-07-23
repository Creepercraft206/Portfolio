import {Component, OnInit} from '@angular/core';
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent implements OnInit {

  constructor(private modalService: ModalService) {}

  closeModal(): void {
    this.modalService.privacyModalOpen.emit(false);
  }

  ngOnInit() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    })
  }
}
