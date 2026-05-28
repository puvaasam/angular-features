import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-discount-widget',
  standalone: true,
  templateUrl: './discount-widget.component.html',
  styleUrl: './discount-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscountWidgetComponent {
  // Signal input
  price = input(100);

  // Signal output (Replaces @Output() + EventEmitter)
  apply = output<number>();
  // <app-discount-widget [price]="150" (apply)="onDiscountClaimed($event)" /> -  copied from parent component
}