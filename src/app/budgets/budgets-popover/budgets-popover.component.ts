import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-budgets-popover',
  styleUrls: ['./budgets-popover.component.scss'],
  template: `
    <ion-list lines="none">
      <ion-item (click)="this._handleEdit()">
        <ion-text>
          <ion-icon name="pencil"></ion-icon> Edit
        </ion-text>
      </ion-item>
      <ion-item (click)="this._handleDelete()" color="danger">
        <ion-text>
          <ion-icon name="trash"></ion-icon> Delete
        </ion-text>
      </ion-item>
    </ion-list>
  `
})
export class BudgetsPopoverComponent implements OnInit {
  @Input() onEdit;
  @Input() onDelete;

  constructor() { }

  ngOnInit() {}

  _handleEdit() {
    return this.onEdit();
  }

  _handleDelete() {
    return this.onDelete();
  }

}
