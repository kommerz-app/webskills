import { Component } from '@angular/core';

@Component({
  selector: 'webskills-sample-launchpad-page',
  templateUrl: './sample-launchpad-page.component.html',
  styleUrls: ['./sample-launchpad-page.component.scss'],
})
export class SampleLaunchpadPageComponent {
  menuItems = [
    {
      spaceTitle: 'Internal Sales',
      pages: [
        {
          link: '/',
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
}
