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
      description:
        "The current portfolio you are looking at. " +
        "Made with Angular as framework, GSAP for the scrolling animations and Bootstrap as CSS Framework. ",
      tags: ["Angular", "TypeScript", "Bootstrap", "HTML", "CSS"],
      img: "portfolio.png",
      links: [
        { name: "Website", url: "https://www.timbahlinger.de", icon: "website.svg" },
        { name: "Github", url: "https://github.com/Creepercraft206/Portfolio", icon: "github.svg" }
      ]
    },
    {
      id: 1,
      title: "ChatApp",
      description:
        "A recreation of the popular chatapp Discord, made with Angular and Firebase. " +
        "Chat with friends, create and edit servers and personalize your profile. " +
        "You can upload images and use markdown to format your messages. ",
      tags: ["Angular", "Firebase", "Node.js", "TypeScript", "HTML", "CSS", "Electron.js"],
      img: "Discord.png",
      links: [
        { name: "Website", url: "https://chatapp.timbahlinger.de", icon: "website.svg" },
        { name: "Github", url: "https://github.com/Creepercraft206/Chatapp", icon: "github.svg" }
      ]
    },
    {
      id: 2,
      title: "Vin-O-Log Parcel Logistic Services",
      description:
        "Vin-O-Log is a parcel service offering their customers unique options to ship their packages for a cheap price. " +
        "I reworked their website with a brand new design and a new customer interface with easy options to ship and order packages. ",
      tags: ["Angular", "Node.js", "Python", "TypeScript", "Bootstrap", "HTML", "CSS"],
      img: "vinolog.png",
      links: [
        { name: "Website", url: "https://vinolog.at", icon: "website.svg" }
      ]
    },
    {
      id: 3,
      title: "CommandBinder",
      description:
        "CommandBinder is a Minecraft Spigot plugin which allows serverowners to create custom items with unique abilities. " +
        "By binding commands from your favorite plugins to items, you can create a unique experience for your server. " +
        "With lots of customization options, CommandBinder provides endless possibilities to create new things in-game. " +
        "This Plugin is a recreation of the CommandBinder plugin from the PServer-Gamemode from NeruxVace.de.",
      tags: ["Java"],
      img: "commandbinder.png",
      links: [
        { name: "SpigotMC", url: "https://www.spigotmc.org/resources/commandbinder.114872/", icon: "spigot.png" },
        { name: "Github", url: "https://github.com/Creepercraft206/CommandBinder", icon: "github.svg" }
      ]
    },
    {
      id: 4,
      title: "BlockUI",
      description:
        "BlockUI is a Web-component library based on Angular that allows you to create beautiful and customizable user interfaces. " +
        "It includes components like file-inputs, modals, video players, custom code highlighting, math expression rendering and much more." +
        "It is designed to be easy to use and customize with CSS variables. More components are already in planing.",
      tags: ["Angular", "TypeScript", "HTML", "CSS"],
      img: "BlockUI.svg",
      links: [
        { name: "NPM", url: "https://www.npmjs.com/package/blockui-components", icon: "npm.svg" },
        { name: "Github", url: "https://github.com/Creepercraft206/block-ui", icon: "github.svg" }
      ]
    },
    // {
    //   id: 5,
    //   title: "HG-Practice",
    //   description:
    //     "I'm currently recoding most of the plugins from my old Minecraftserver HG-Practice.de. " +
    //     "I will release the recoded source of the 3 gamemodes HG, Damager and SoupFFA, " +
    //     "a new GameAPI on which these modes are based on, a Lobbysystem and an Automessage-System when they are finished. ",
    //   tags: ["Java", "MySQL"],
    //   img: "hgpractice.png",
    //   links: [
    //     { name: "HG", url: "https://www.github.com", icon: "github.svg" },
    //     { name: "Damager", url: "https://www.github.com", icon: "github.svg" },
    //     { name: "SoupFFA", url: "https://www.github.com", icon: "github.svg" },
    //     { name: "GameAPI", url: "https://www.github.com", icon: "github.svg" },
    //     { name: "Lobbysystem", url: "https://www.github.com", icon: "github.svg" }
    //   ]
    // },
    {
      id: 5,
      title: "HGLabor HeroFFA Stats",
      description:
        "My submission for the coding challenge of Noriskk. " +
        "The goal was to design a stats website for the new Gamemode of their Minecraftserver HGLabor.de, " +
        "using their API.",
      tags: ["Angular", "Node.js", "TypeScript", "Bootstrap", "HTML", "CSS"],
      img: "HGLaborStats.png",
      links: [
        { name: "Website", url: "https://hglabor.timbahlinger.de", icon: "website.svg" },
        { name: "GitHub", url: "https://github.com/Creepercraft206/HGLabor_FFA_Stats", icon: "github.svg" },
        { name: "Video", url: "https://youtu.be/fDFt_GqSctc?si=v52Qyq2JIUQKp607", icon: "video.svg" }
      ]
    },
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
