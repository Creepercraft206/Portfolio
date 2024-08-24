import {Component, OnInit} from '@angular/core';
import { NgTemplateOutlet } from "@angular/common";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
import {ProjectComponent} from "../project/project.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    NgTemplateOutlet, ProjectComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Text
    const text = document.getElementById("professions") as HTMLSpanElement;
    const professions = ["Fullstack Developer", "Java Developer", "UX/UI Designer", "Web Developer", "OOP Developer", "Problemsolver", "Minecraft Developer"];
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!§$%&/{}[];:-_";
    let i = 0;
    setInterval(() => {
      let count = 0;
      let scrumble = setInterval(() => {
        let randomString = "";
        for (let k = 0; k < professions[i].length; k++) {
          randomString += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        text.innerHTML = randomString;
        count++;
        if (count === 50) {
          clearInterval(scrumble);
          text.innerHTML = professions[i];
        }
      }, 10);
      i = (i + 1) % professions.length;
    }, 5000);

    this.setFooterTime();

    this.gsapAnimations();
  }

  gsapAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);
    const screenWidth = window.innerWidth;

    gsap.to("#squares", { rotate: 60, scale: 15, scrollTrigger: { trigger: "body", start: "0", end: () => innerHeight*5, scrub: true } });
    gsap.to("#welcome-text", { scale: 5, alpha: 0, scrollTrigger: { trigger: "body", start: "0", end: () => innerHeight*2, scrub: true } });
    gsap.to("#welcome-info", { alpha: 1, scrollTrigger: { trigger: "body", start: "0", end: () => innerHeight*5, scrub: true } });


    gsap.fromTo("#welcome-info h1",
      { alpha: 1, scrollTrigger: { trigger: "body", start: "0", end: () => innerHeight*5, scrub: true } },
      { scale: 14, y: 38, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*2.5, end: () => innerHeight*4, scrub: true } }
    );

    gsap.fromTo("#slash",
      { alpha: 1, width: "8px", height: "55px", borderRadius: "0", scale: 1, y: "0", scrollTrigger: { trigger: "body", start: "0", end: () => innerHeight*5, scrub: true } },
      { transform: "skew(0) translateX(-50%)", scrollTrigger: { trigger: "body", start: () => innerHeight*2.5, end: () => innerHeight*4, scrub: true } }
    );
    gsap.fromTo("#slash",
      { alpha: 1, scrollTrigger: { trigger: "body", start: "0", end: () => innerHeight*5, scrub: true } },
      { width: () => innerWidth/10, height: () => innerHeight / 10, scrollTrigger: { trigger: "body", start: () => innerHeight*3, end: () => innerHeight*4, scrub: true } }
    );

    gsap.to(".skills",
      { display: "block", scale: 1, alpha: 1, y: () => -innerHeight, scrollTrigger: { trigger: "body", start: () => innerHeight*3.5, end: () => innerHeight*4.5, scrub: true } },
    );
    gsap.fromTo(".skills",
      { alpha: 1, y: () => -innerHeight, scrollTrigger: { trigger: "body", start: () => innerHeight*3.5, end: () => innerHeight*4.5, scrub: true } },
      { y: () => -innerHeight*1.25, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*4.5, end: () => innerHeight*5, scrub: true } }
    );

    gsap.fromTo(".skills",
      { alpha: 1, y: () => -innerHeight*1.25, duration:3, scrollTrigger: { trigger: "body", start: () => innerHeight*4.5, end: () => innerHeight*5, scrub: true } },
      { y: () => -innerHeight*1.5, scale: 0.8, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } }
    );
    gsap.fromTo("#welcome-info h1 span",
      { scale: 1, y: 38, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*2.5, end: () => innerHeight*4, scrub: true }},
      { alpha: 0, scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } }
    );
    gsap.fromTo("#slash",
      { width: () => innerWidth/10, scrollTrigger: { trigger: "body", start: () => innerHeight*3, end: () => innerHeight*4, scrub: true } },
      { scale: 0.6, y: () => -innerHeight*0.0175, borderRadius: "0 0 5px 5px", scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } }
    );

    gsap.to("#welcome-info", { color: "black", scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } });
    gsap.to(".normal-part", { alpha: 1, display: "block", duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } });


    gsap.fromTo("#slash",
      { scale: 0.6, y: () => -innerHeight*0.0175, borderRadius: "0 0 5px 5px", scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } },
      { y: () => -innerHeight*0.1, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*5.5, end: () => innerHeight*7.5, scrub: true } }
    );
    gsap.fromTo(".skills",
      { y: () => -innerHeight*1.5, scale: 0.8, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*5, end: () => innerHeight*5.5, scrub: true } },
      { y: () => -innerHeight*2.65, duration: 3, scrollTrigger: { trigger: "body", start: () => innerHeight*5.5, end: () => innerHeight*7.5, scrub: true } }
    );
  }

  setFooterTime(): void {
    const timeElement = document.querySelector(".current-time") as HTMLDivElement;
    setInterval(() => {
      const germanyTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      timeElement.innerText = germanyTime;
    }, 1000);
  }

  year = new Date().getFullYear();
}
