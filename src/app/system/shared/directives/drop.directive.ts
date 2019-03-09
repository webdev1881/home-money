import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[hmyDrop]'
})
export class DropDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener ('click') onclick() {
    this.isOpen = !this.isOpen;
  }

}
