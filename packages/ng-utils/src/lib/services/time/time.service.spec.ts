import { TimeService } from './time.service';
import { TestBed } from '@angular/core/testing';
import { TimeAdapter } from './time.adapter';
import { TrackingService } from '../tracking/tracking.service';
import { Config, CONFIG } from '../configuration/config';

describe('TimeService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TimeAdapter,
          useValue: {
            getServerTime: jest.fn(),
          },
        },
        {
          provide: CONFIG,
          useValue: new Config({ apiBasePath: '', production: false }),
        },
        {
          provide: TrackingService,
          useValue: {},
        },
      ],
    }),
  );

  it('should be zero if diff smaller than runtime', () => {
    const service: TimeService = TestBed.inject(TimeService);

    expect(
      service._calcOffset(new Date(0), new Date(1000), new Date(4000)),
    ).toBe(0);

    expect(
      service._calcOffset(new Date(0), new Date(3000), new Date(4000)),
    ).toBe(0);
  });

  it('should be positive', () => {
    const service: TimeService = TestBed.inject(TimeService);

    const offset = service._calcOffset(
      new Date(0),
      new Date(10000),
      new Date(4000),
    );
    expect(offset).toBe(8000);
  });

  it('should be positive if we are in past', () => {
    const service: TimeService = TestBed.inject(TimeService);

    const offset = service._calcOffset(
      new Date(0),
      new Date(6000),
      new Date(4000),
    );
    expect(offset).toBe(4000);
  });

  it('should be negative if we are in future', () => {
    const service: TimeService = TestBed.inject(TimeService);

    const offset = service._calcOffset(
      new Date(0),
      new Date(-4000),
      new Date(4000),
    );
    expect(offset).toBe(-6000);
  });

  it('should be negative if we are little in future', () => {
    const service: TimeService = TestBed.inject(TimeService);

    const offset = service._calcOffset(
      new Date(0),
      new Date(-1000),
      new Date(4000),
    );
    expect(offset).toBe(-3000);
  });
});
