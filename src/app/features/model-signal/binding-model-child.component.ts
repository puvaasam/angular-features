import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-binding-model-child',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card class="card">
      <mat-card-content>
        <div class="counter-display">
          <p class="label">Current Value (model):</p>
          <p class="value">{{ count() }}</p>
        </div>

        <div class="counter-controls">
          <button mat-raised-button color="primary" (click)="decrement()">Decrement</button>
          <button mat-raised-button color="warn" (click)="reset()">Reset</button>
          <button mat-raised-button color="primary" (click)="increment()">Increment</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './2way-binding-with-model-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BindingModelChildComponent {
  // model() creates a two-way binding signal
  count = model(0);

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }

  reset() {
    this.count.set(0);
  }
}
