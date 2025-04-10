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
    //this.placeIcons();
    //this.moveIcons();
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
      for (let i = 0; i <= 1; i++) {
        const e = document.createElement("img");
        e.src = `${mainPath + icon}`;
        e.classList.add("background-icon");
        e.style.left = `${this.getRandomOutsideBorder(30, 70)}%`;
        e.style.top = `${Math.floor(Math.random() * 80)}%`;
        e.style.position = "absolute";
        e.style.width = "50px";
        e.style.zIndex = "-1";
        e.style.filter = "brightness(0.3)";
        document.querySelector(".icon-container")?.appendChild(e);
      }
    });
  }

  getRandomOutsideBorder(border1: number, border2: number): number {
    let num = Math.random() * 100;
    while (num > border1 && num < border2) {
      num = Math.random() * 100;
    }
    Math.floor(num);
    return num;
  }

  moveIcons() {
    window.addEventListener("mousemove", function (e) {
      const icons = document.querySelectorAll(".icon-container img");
      icons.forEach((icon) => {
        let oldStyle = icon.getAttribute("style");
        let newStyle = `${oldStyle?.replace(oldStyle.slice(oldStyle.search("transform"),oldStyle.search(";")),"")} transform = translate(${e.clientX * 0.5}px, ${e.clientY * 0.5});`;
        console.log(oldStyle?.replace(/transform = translate\((.*?)\)/g, `transform = translate(${e.clientX * 0.5}px, ${e.clientY * 0.5}px);`));
        //console.log(`${oldStyle?.slice(oldStyle.search("transform"),150)}`);
        icon.removeAttribute("style");
        icon.setAttribute("style", newStyle);
      });
    });
  }
}
