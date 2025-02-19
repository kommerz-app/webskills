import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { TemplateDirective } from '../../template/template.directive';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';

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
  headerComponent: string;
  detailsComponent: string;
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
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [RouterLink, MatCard],
})
export class LaunchpadComponent {
  @Input() groups?: Group[];

  @ContentChildren(TemplateDirective)
  detailsTemplates!: QueryList<TemplateDirective>;

  getColumnTemplate(name: string): TemplateRef<any> | null {
    return (
      this.detailsTemplates?.find((t) => t.name === name)?.template ?? null
    );
  }
}
