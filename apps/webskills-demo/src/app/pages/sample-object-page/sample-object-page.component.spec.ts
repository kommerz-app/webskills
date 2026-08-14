import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ToastService } from '@webskills/ng-components';

import { SampleObjectPageComponent } from './sample-object-page.component';

describe('SampleObjectPageComponent', () => {
  let fixture: ComponentFixture<SampleObjectPageComponent>;
  let component: SampleObjectPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleObjectPageComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleObjectPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render the object page floorplan with its content components', () => {
    // Given the object page

    // When it has been rendered
    const element: HTMLElement = fixture.nativeElement;

    // Then the floorplan and the components it hosts are present
    expect(element.querySelector('wsk-object-page')).not.toBeNull();
    expect(element.querySelector('wsk-split-button')).not.toBeNull();
    expect(element.querySelector('wsk-file-upload')).not.toBeNull();
  });

  it('should hand a notification to the toast service when a toast is requested', () => {
    // Given a page whose toast service is being observed
    const toastService = TestBed.inject(ToastService);
    const emitMessage = vi.spyOn(toastService, 'emitMessage');

    // When the user asks for a toast
    component.onShowToastClicked();

    // Then a notification is emitted
    expect(emitMessage).toHaveBeenCalledTimes(1);
    expect(emitMessage.mock.calls[0][0]).toMatchObject({
      type: 'notification',
    });
  });
});
