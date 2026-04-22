import { ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';
import { CounterWidgetComponent } from '../counter/counter-widget.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { DiscountWidgetComponent } from '../discount/discount-widget.component/discount-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CounterWidgetComponent, GalleryComponent, DiscountWidgetComponent],
  template: `
    <section class="page">
      <header class="header">
        <h1>Dashboard</h1>
        <p>Welcome to the Education Institution Management System.</p>
      </header>

      <section class="panel">
        <h2>Counter Widgets</h2>
        <p>Two child counters with parent controls.</p>

        <div class="parent-actions">
          <button type="button" (click)="incrementAll()">Increment All</button>
          <button type="button" class="secondary" (click)="decrementAll()">Decrement All</button>
        </div>

        <div class="counter-grid">
          <app-counter-widget [label]="'Counter A'" [globalAction]="globalAction()" [actionTick]="actionTick()" />
          <app-counter-widget [label]="'Counter B'" [globalAction]="globalAction()" [actionTick]="actionTick()" />
        </div>
      </section>

      <section class="panel">
        <h2>Discount Widget (@ let & output)</h2>
        <p>Shows how to calculate local variables in template and emit signals.</p>

        @if (claimedDiscount() !== null) {
          <div class="success">
            <strong>Success!</strong> You claimed a discount. Final price is \${{ claimedDiscount() }}
            <button type="button" class="secondary" (click)="resetDiscount()" style="margin-left: 1rem;">Reset</button>
          </div>
        } @else {
          <app-discount-widget [price]="150" (apply)="onDiscountClaimed($event)" />
        }
      </section>

      <app-gallery></app-gallery>


    </section>
  `,
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  protected readonly globalAction = signal<'increment' | 'decrement'>('increment');
  protected readonly actionTick = signal(0);
  protected readonly claimedDiscount = signal<number | null>(null);

  protected incrementAll(): void {
    this.globalAction.set('increment');
    this.actionTick.update((value) => value + 1);
  }

  protected decrementAll(): void {
    this.globalAction.set('decrement');
    this.actionTick.update((value) => value + 1);
  }

  protected onDiscountClaimed(finalPrice: number): void {
    this.claimedDiscount.set(finalPrice);
  }

  protected resetDiscount(): void {
    this.claimedDiscount.set(null);
  }
}
