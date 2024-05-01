import {Component, Input, Signal} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {toSignal} from "../../utils/signals/signal.util";
import {FAQModel} from "../../models/FAQ.model";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  @Input({transform: toSignal})
  faqs!: Signal<FAQModel[]>

  closeAllQuestions(index: number) {
    if (this.faqs()) {
      for (let i = 0; i < this.faqs().length; i++) {
        if (this.faqs()[i]) {
          this.faqs()[i].open = false;
        }
      }
      if (this.faqs()[index]) {
        this.faqs()[index].open = true;
      }
    }
  }
}
