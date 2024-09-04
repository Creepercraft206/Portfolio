import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    BsDropdownModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projects: any[] = [
    {
      id: 0,
      title: "Portfolio",
      description: "The current portfolio you are looking at. " +
        "It is based on Angular and uses GSAP for the scrolling animations. " +
        "I also used Bootstrap as CSS framework.",
      tags: ["Angular", "TypeScript", "Bootstrap", "HTML", "CSS"],
      img: "portfolio.png",
      links: [
        { name: "Website", url: "https://www.timbahlinger.de", icon: "website.svg" },
        { name: "Github", url: "https://github.com/Creepercraft206/Portfolio", icon: "github.svg" }
      ]
    },
    {
      id: 1,
      title: "Discord clone",
      description: "A recreation of the popular chatapp Discord, made with Angular and Firebase. " +
        "You can chat with friends, create and edit servers and personalize your profile. " +
        "I used Firebase for the Firestore database to store all the data in an encrypted way and the Authentication to login and register users.",
      tags: ["Angular", "Firebase", "Node.js", "TypeScript", "HTML", "CSS", "Electron.js"],
      img: "test.png",
      links: [
        { name: "Website", url: "https://discord.timbahlinger.de", icon: "website.svg" },
        { name: "Github", url: "https://github.com/Creepercraft206/Discord", icon: "github.svg" }
      ]
    },
    {
      id: 2,
      title: "CommandBinder",
      description: "A Minecraft Spigot plugin that allows users to add commands to items. " +
        "With lots of placeholders and custom commands to delay or repeat a command, you have lots of customization possibilities. " +
        "You can also add options if the item should be consumed or if a confirmation is needed. " +
        "This Plugin is a recreation of the CommandBinder plugin from NeruxVace.de.",
      tags: ["Java"],
      img: "commandbinder.png",
      links: [
        { name: "SpigotMC", url: "https://www.spigotmc.org/resources/commandbinder.114872/", icon: "spigot.png" },
        { name: "Github", url: "https://github.com/Creepercraft206/CommandBinder", icon: "github.svg" }
      ]
    },
    {
      id: 3,
      title: "HG-Practice",
      description: "I'm currently recoding most of the plugins from my old Minecraftserver HG-Practice.de. " +
        "What i'm recreating are the 3 gamemodes HG, Damager and SoupFFA, " +
        "a new GameAPI on which these modes are based on, a Lobbysystem and an Automessage-System.",
      tags: ["Java", "MySQL"],
      img: "hgpractice.png",
      links: [
        { name: "HG", url: "https://www.github.com", icon: "github.svg" },
        { name: "Damager", url: "https://www.github.com", icon: "github.svg" },
        { name: "SoupFFA", url: "https://www.github.com", icon: "github.svg" },
        { name: "GameAPI", url: "https://www.github.com", icon: "github.svg" },
        { name: "Lobbysystem", url: "https://www.github.com", icon: "github.svg" }
      ]
    }
  ];

  filteredProjects: any[] = [];

  ngOnInit() {
    this.filteredProjects = this.projects;
  }

  filter(tag: string): void {
    this.resetFilter();
    this.filteredProjects = this.filteredProjects.filter(project => project.tags.includes(tag));
    const noProjects = document.getElementById("no-projects") as HTMLDivElement;
    if (this.filteredProjects.length === 0) {
      noProjects.style.display = "block";
    } else {
      noProjects.style.display = "none";
    }
  }

  resetFilter(): void {
    this.filteredProjects = this.projects
  }
}
