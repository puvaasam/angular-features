import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-counter-widget',
  standalone: true,
  template: `
    <article class="counter-card">
      <h3>{{ label() }}</h3>
      <p class="value">{{ count() }}</p>

      <div class="actions">
        <button type="button" (click)="increment()">Increment</button>
        <button type="button" class="secondary" (click)="decrement()">Decrement</button>
      </div>
    </article>
  `,
  styleUrl: './counter-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterWidgetComponent {
  //input create readonly signal
  label = input('Counter');
  globalAction = input<'increment' | 'decrement'>('increment');
  actionTick = input(0);

  // Unlike input() , signal() is writable. We can update its value directly using .set() or .update()
  protected readonly count = signal(0);

  /*
  #Why actionTick was used:
        The effect() function runs whenever any signal read inside it changes.
        If we only depend on globalAction (which is 'increment' or 'decrement' ), and the user clicks the "Increment All" button twice in a row:

        1. First click: globalAction is set to 'increment' . The effect runs and adds 1.
        2. Second click: globalAction is set to 'increment' again. Because the value hasn't actually changed (it was already 'increment' ), the signal does not emit a change event, and the effect will NOT run.

  */

  constructor() {
    effect(() => {
      const tick = this.actionTick(); // Reads the signal from parent component
      if (tick === 0) return;
      const action = this.globalAction(); // Reads the signal from parent component <1 | -1>
      this.count.update((value) => (action === 'increment' ? value + 1 : value - 1));
    });
  }

  protected increment(): void {
    this.count.update((value) => value + 1);
  }

  protected decrement(): void {
    this.count.update((value) => value - 1);
  }
}