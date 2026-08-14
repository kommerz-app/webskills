import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ToastViewComponent } from './toast-view.component';
import { ToastMessage } from './toast';

describe('ToastViewComponent', () => {
  let fixture: ComponentFixture<ToastViewComponent>;
  let component: ToastViewComponent;

  const message: ToastMessage = {
    messageTitle: 'Document saved',
    type: 'success',
    autoHide: false,
  };

  const renderedToasts = (): NodeListOf<Element> =>
    fixture.nativeElement.querySelectorAll('wsk-toast-item');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastViewComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render a toast that was added imperatively', async () => {
    // Given a toast view with nothing to show
    expect(renderedToasts().length).toBe(0);

    // When ToastService pushes a message in from outside any template event
    component.addToast(message);
    await fixture.whenStable();

    // Then the toast is rendered
    expect(renderedToasts().length).toBe(1);
  });

  it('should stop rendering a toast once it has been removed', async () => {
    // Given a rendered toast
    component.addToast(message);
    await fixture.whenStable();
    expect(renderedToasts().length).toBe(1);

    // When the toast reports that it has disappeared
    component.onRemoved(message);
    await fixture.whenStable();

    // Then it is gone from the view
    expect(renderedToasts().length).toBe(0);
  });

  it('should default the time to live of a message that does not define one', () => {
    // Given a message without an explicit ttl
    const withoutTtl: ToastMessage = { messageTitle: 'No ttl', type: 'warn' };

    // When it is added
    component.addToast(withoutTtl);

    // Then it inherits the view default
    expect(withoutTtl.ttlSeconds).toBe(component.ttlSeconds);
  });
});
