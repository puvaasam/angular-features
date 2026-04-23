import { ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CounterWidgetComponent } from '../counter/counter-widget.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { DiscountWidgetComponent } from '../discount/discount-widget.component/discount-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CounterWidgetComponent, GalleryComponent, DiscountWidgetComponent, MatCardModule, MatButtonModule],
  template: `
    <section class="page">
      <header class="header">
        <h1>Dashboard</h1>
        <p>Welcome to the Education Institution Management System.</p>
      </header>

      <mat-card class="panel" appearance="outlined">
        <mat-card-header>
          <mat-card-title>Counter Widgets</mat-card-title>
          <mat-card-subtitle>Two child counters with parent controls.</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="parent-actions">
            <button mat-flat-button color="primary" (click)="incrementAll()">Increment All</button>
            <button  class="secondary"  (click)="decrementAll()">Decrement All</button>
          </div>

          <div class="counter-grid">
            <app-counter-widget [label]="'Counter A'" [globalAction]="globalAction()" [actionTick]="actionTick()" />
            <app-counter-widget [label]="'Counter B'" [globalAction]="globalAction()" [actionTick]="actionTick()" />
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="panel" appearance="outlined">
        <mat-card-header>
          <mat-card-title>Discount Widget (@ let & output)</mat-card-title>
          <mat-card-subtitle>Shows how to calculate local variables in template and emit signals.</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (claimedDiscount() !== null) {
            <div class="success">
              <strong>Success!</strong> You claimed a discount. Final price is \${{ claimedDiscount() }}
              <button mat-stroked-button color="warn" (click)="resetDiscount()" style="margin-left: 1rem;">Reset</button>
            </div>
          } @else {
            <app-discount-widget [price]="150" (apply)="onDiscountClaimed($event)" />
          }
        </mat-card-content>
      </mat-card>

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
