import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BindingModelChildComponent } from './binding-model-child.component';

/*
- What it demonstrates : A customizable counter with two-way binding
- Key points : model() combines @Input() and @Output() into a single signal API
- Features :
- Child component ( BindingModelChildComponent ) uses count = model(0)
- Parent uses two-way binding: [(count)]="parentCount"
- Changes propagate both ways (child ↔ parent)

*/
@Component({
  selector: 'app-2way-binding-with-model-signal',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, BindingModelChildComponent],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>model() Signal Example</mat-card-title>
          <mat-card-subtitle>Two-way binding made simple with signals</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="explanation">
            <strong>model()</strong> is a built-in signal that creates a two-way binding.
            It combines the functionality of @Input() and @Output() in a single API.
          </p>

          <div class="demo-section">
            <h3>Parent State: {{ parentCount() }}</h3>
            
            <div class="counters">
              <!-- Two-way binding using [(count)]="parentCount()" -->
              <app-binding-model-child [(count)]="parentCount" />
            </div>

            <div class="parent-controls">
              <button mat-raised-button color="accent" (click)="doubleValue()">
                Double Value from Parent
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './2way-binding-with-model-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoWayBindingWithModelSignalComponent {
  parentCount = signal(5);

  doubleValue() {
    this.parentCount.update(v => v * 2);
  }
}
