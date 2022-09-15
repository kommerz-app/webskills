import { Component } from '@angular/core';
import { Group } from '@webskills/ng-components';

@Component({
  selector: 'webskills-sample-launchpad-page',
  templateUrl: './sample-launchpad-page.component.html',
  styleUrls: ['./sample-launchpad-page.component.scss'],
})
export class SampleLaunchpadPageComponent {
  menuItems = [
    {
      spaceTitle: 'Internal Sales',
      spaceLink: '/object-page',
      pages: [
        {
          link: '/object-page',
          text: 'Overview',
        },
        {
          link: '/',
          text: 'Sales Processing',
        },
        {
          link: '/',
          text: 'Sales Rebates',
        },
        {
          link: '/',
          text: 'Sales Commissions and Incentives',
        },
        {
          link: '/',
          text: 'Sales Products',
        },
      ],
    },
    {
      spaceTitle: 'Sourcing and Contracting',
    },
  ];

  groups: Group[] = [
    {
      groupTitle: 'Object page',
      maxColumn: 6,
      tiles: [
        {
          title: 'Object page',
          subtitle: 'Example Object page header',
          link: '/object-page',
          icon: 'receipt',
        },
        {
          title: 'Object page',
          subtitle: 'Example Object page header',
          link: '/object-page',
          icon: 'receipt',
        },
        {
          title: 'Object page',
          subtitle: 'Example Object page header',
          link: '/object-page',
          icon: 'receipt',
        },
        {
          title: 'Object page',
          subtitle: 'Example Object page header',
          link: '/object-page',
          icon: 'receipt',
        },
        {
          title: 'Object page',
          subtitle: 'Example Object page header',
          link: '/object-page',
          icon: 'receipt',
        },
        {
          title: 'Object page',
          subtitle: 'Example Object page header',
          link: '/object-page',
          icon: 'receipt',
        },
      ],
      links: [
        {
          link: '/object-page',
          title: 'LinkTitle',
          subtitle: 'subtitle',
        },
        {
          link: '/object-page',
          title: 'LinkTitle',
          subtitle: 'subtitle',
        },
      ],
    },
    {
      groupTitle: 'List report page',
      maxColumn: 6,
      tiles: [
        {
          title: 'List report page',
          subtitle: 'Example List report page header',
          link: '/list-report-page',
          icon: 'receipt',
        },
        {
          title: 'List report page',
          subtitle: 'Example List report page header',
          link: '/list-report-page',
          icon: 'receipt',
        },
      ],
    },
  ];
}
