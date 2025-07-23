import {Component, OnInit} from '@angular/core';
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css'
})
export class ImprintComponent implements OnInit {

  constructor(private modalService: ModalService) {}

  closeModal(): void {
    this.modalService.imprintModalOpen.emit(false);
  }

  ngOnInit() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    })
  }
}
