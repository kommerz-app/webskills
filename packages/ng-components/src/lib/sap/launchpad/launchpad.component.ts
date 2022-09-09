import { Component, Input } from '@angular/core';

export interface Group {
  groupTitle?: string;
  maxColumn: number;
  tiles: Tile[];
  links?: Links[];
}

export interface Tile {
  title: string;
  subtitle: string;
  link: string;
  icon: string;
}

export interface Links {
  link: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'wsk-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss'],
})
export class LaunchpadComponent {
  @Input() groups!: Group[];
}
