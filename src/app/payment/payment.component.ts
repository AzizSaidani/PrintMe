import {Component, OnInit} from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  stripe: any;
  card: any;

  constructor() {}

  async ngOnInit() {
    // Load the Stripe.js library
    this.stripe = await loadStripe('pk_test_51Lyzt5GUzUAnKjP7GaetFbAkzNnUTx2ZOdcH1TqLtFhZJEZA59G6wfxp9Q7M70tRhCqjErdZeLN1dYxeyPFkRO9N007IOrrnzD');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async handlePayment() {
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        name: 'Test User',
      },
    });

    if (error) {
      console.error('Payment method creation failed:', error);
    } else {
      console.log('Payment method created successfully:', paymentMethod);
      // You can now display the payment method details or proceed with your test
    }
  }
}
