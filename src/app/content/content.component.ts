import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
import {ProjectComponent} from "../project/project.component";
import {ImprintComponent} from "../imprint/imprint.component";
import {ModalService} from "../modal.service";
import {PrivacyComponent} from "../privacy/privacy.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ProjectComponent,
    ImprintComponent,
    NgIf,
    PrivacyComponent,
    NgOptimizedImage
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  constructor(private modalService: ModalService) {}

  age: number = 19;

  imprintModalOpen: boolean = false;
  openImprintModal(): void {
    this.imprintModalOpen = true;
    this.modalService.imprintModalOpen.emit(true);
  }

  privacyModalOpen: boolean = false;
  openPrivacyModal(): void {
    this.privacyModalOpen = true;
    this.modalService.privacyModalOpen.emit(true);
  }

  ngOnInit(): void {
    const birthDate = new Date("2006-04-12");
    const today = new Date();
    if ((today.getMonth() == birthDate.getMonth() && today.getDate() >= birthDate.getDate()) || (today.getMonth() > birthDate.getMonth())) {
      this.age = today.getFullYear() - birthDate.getFullYear();
    } else {
      this.age = today.getFullYear() - birthDate.getFullYear() - 1;
    }

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

    document.addEventListener("mousemove", (event) => {
      this.moveContactWrapper(event);
    });

    this.modalService.imprintModalOpen.subscribe((isOpen: boolean) => {
      this.imprintModalOpen = isOpen;
    });
    this.modalService.privacyModalOpen.subscribe((isOpen: boolean) => {
      this.privacyModalOpen = isOpen;
    });
  }

  gsapAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Create a resize observer to update animations on window resize
    const updateScrollTrigger = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', updateScrollTrigger);

    // Calculate responsive values based on viewport
    const getResponsiveValue = (mobile: number, desktop: number) => {
      return window.innerWidth <= 768 ? mobile : desktop;
    };

    // Welcome section animations
    gsap.to("#squares", {
      rotate: 60,
      scale: 15,
      scrollTrigger: {
        trigger: "body",
        start: "0",
        end: () => innerHeight * 5,
        scrub: 1
      }
    });

    gsap.to("#welcome-text", {
      scale: 5,
      alpha: 0,
      scrollTrigger: {
        trigger: "body",
        start: "0",
        end: () => innerHeight * 2,
        scrub: 1
      }
    });

    gsap.to("#welcome-info", {
      alpha: 1,
      scrollTrigger: {
        trigger: "body",
        start: "0",
        end: () => innerHeight * 5,
        scrub: 1
      }
    });

    // Welcome info text animations
    gsap.fromTo("#welcome-info h1",
      {
        alpha: 1,
        scrollTrigger: {
          trigger: "body",
          start: "0",
          end: () => innerHeight * 5,
          scrub: 1
        }
      },
      {
        scale: 14,
        y: 38,
        duration: 3,
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 2.5,
          end: () => innerHeight * 4,
          scrub: 1
        }
      }
    );

    // Slash animations
    gsap.fromTo("#slash",
      {
        alpha: 1,
        width: "8px",
        height: "55px",
        borderRadius: "0",
        scale: 1,
        y: "0",
        transform: "skew(-30deg) translateX(-50%)"
      },
      {
        transform: "skew(0) translateX(-50%)",
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 2.5,
          end: () => innerHeight * 4,
          scrub: 1
        }
      }
    );

    gsap.to("#slash", {
      width: () => innerWidth/10,
      height: () => innerHeight / 10,
      y: () => -innerHeight * 0.025,
      scrollTrigger: {
        trigger: "body",
        start: () => innerHeight * 3.5,
        end: () => innerHeight * 4.5,
        scrub: 1,
        immediateRender: false
      }
    });

    gsap.to("#slash", {
      scale: 0.6,
      borderRadius: "0 0 5px 5px",
      scrollTrigger: {
        trigger: "body",
        start: () => innerHeight * 5,
        end: () => innerHeight * 5.5,
        scrub: 1,
        immediateRender: false
      }
    });

    // Skills section animations
    gsap.to(".skills",
      {
        display: "block",
        scale: 1,
        alpha: 1,
        y: () => -innerHeight,
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 3.5,
          end: () => innerHeight * 4.5,
          scrub: 1
        }
      }
    );

    gsap.fromTo(".skills",
      {
        alpha: 1,
        y: () => -innerHeight,
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 3.5,
          end: () => innerHeight * 4.5,
          scrub: 1
        }
      },
      {
        y: () => -innerHeight * 1.25,
        duration: 3,
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 4.5,
          end: () => innerHeight * 5,
          scrub: 1
        }
      }
    );

    // Final transitions
    gsap.fromTo(".skills",
      {
        alpha: 1,
        y: () => -innerHeight * 1.25,
        duration: 3,
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 4.5,
          end: () => innerHeight * 5,
          scrub: 1
        }
      },
      {
        y: () => -innerHeight * 1.5,
        scale: 0.8,
        duration: 3,
        scrollTrigger: {
          trigger: "body",
          start: () => innerHeight * 5,
          end: () => innerHeight * 5.5,
          scrub: 1
        }
      }
    );

    gsap.to("#welcome-info h1 span", {
      opacity: 0,
      scrollTrigger: {
        trigger: "body",
        start: () => innerHeight * 4.5,
        end: () => innerHeight * 5,
        scrub: 1
      }
    });

    gsap.to(".normal-part", {
      alpha: 1,
      display: "block",
      duration: 3,
      scrollTrigger: {
        trigger: "body",
        start: () => innerHeight * 5,
        end: () => innerHeight * 5.5,
        scrub: 1
      }
    });
  }

  moveContactWrapper(event: MouseEvent): void {
    const contactWrapper = document.querySelector(".contact-wrapper") as HTMLDivElement;
    // rotate the contact wrapper 3d based on mouse position
    const x = (event.clientX / window.innerWidth - 0.5) * 35;
    const y = (event.clientY / window.innerHeight - 0.5) * 35;
    contactWrapper.style.transform = `rotateX(${y}deg) rotateY(${x}deg) perspective(1000px)`;
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
