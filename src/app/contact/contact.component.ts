import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  ngOnInit() {
    this.blob();
    this.placeIcons();
  }

  blob() {
    document.addEventListener("mousemove", (e) => {
      const blob = document.getElementById("blob") as HTMLDivElement;
      setTimeout(() => {
        blob.style.left = `${e.clientX - 75}px`;
        blob.style.top = `${e.clientY - 75}px`;
      }, 200);
    });
  }

  placeIcons() {
    let mainPath = "assets/images/skills/"
    let icons = ["angular.png","css.png","firebase.png","html.webp","java.webp","javascript.png","mysql.webp","nodejs.png","typescript.png","python.png"];
    icons.forEach((icon) => {
      for (let i = 0; i <= 20; i++) {
        let code = `
          <img src="${mainPath + icon}" class="background-icon" style="left: ${Math.floor(Math.random() * 10)}%; right: ${Math.floor(Math.random() * 10)}%" alt="" />
        `;
      }
    });
  }
}
