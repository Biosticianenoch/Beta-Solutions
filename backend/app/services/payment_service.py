import stripe
from flask import current_app
from typing import Dict, Any, Optional, List

class PaymentService:
    def __init__(self):
        self.stripe = stripe
        self.stripe.api_key = current_app.config['STRIPE_SECRET_KEY']

    def create_payment_intent(self, amount: int, currency: str = 'usd', customer_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Create a payment intent with Stripe
        """
        try:
            intent = self.stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                customer=customer_id,
                automatic_payment_methods={"enabled": True}
            )
            return {
                'client_secret': intent.client_secret,
                'payment_intent_id': intent.id
            }
        except stripe.error.StripeError as e:
            current_app.logger.error(f"Stripe error: {str(e)}")
            raise

    def confirm_payment(self, payment_intent_id: str) -> Dict[str, Any]:
        """
        Confirm a payment intent
        """
        try:
            intent = self.stripe.PaymentIntent.retrieve(payment_intent_id)
            return {
                'status': intent.status,
                'amount': intent.amount,
                'currency': intent.currency
            }
        except stripe.error.StripeError as e:
            current_app.logger.error(f"Stripe error: {str(e)}")
            raise

    def create_customer(self, email: str, payment_method_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Create or retrieve a Stripe customer
        """
        try:
            customer = self.stripe.Customer.create(
                email=email,
                payment_method=payment_method_id if payment_method_id else None
            )
            return {
                'customer_id': customer.id,
                'email': customer.email
            }
        except stripe.error.StripeError as e:
            current_app.logger.error(f"Stripe error: {str(e)}")
            raise

    def get_saved_payment_methods(self, customer_id: str) -> List[Dict[str, Any]]:
        """
        Get saved payment methods for a customer
        """
        try:
            payment_methods = self.stripe.PaymentMethod.list(
                customer=customer_id,
                type='card'
            )
            return [{
                'id': pm.id,
                'card': {
                    'brand': pm.card.brand,
                    'last4': pm.card.last4,
                    'exp_month': pm.card.exp_month,
                    'exp_year': pm.card.exp_year
                }
            } for pm in payment_methods.data]
        except stripe.error.StripeError as e:
            current_app.logger.error(f"Stripe error: {str(e)}")
            raise

    def attach_payment_method(self, customer_id: str, payment_method_id: str) -> Dict[str, Any]:
        """
        Attach a payment method to a customer
        """
        try:
            payment_method = self.stripe.PaymentMethod.attach(
                payment_method_id,
                customer=customer_id
            )
            return {
                'id': payment_method.id,
                'card': {
                    'brand': payment_method.card.brand,
                    'last4': payment_method.card.last4,
                    'exp_month': payment_method.card.exp_month,
                    'exp_year': payment_method.card.exp_year
                }
            }
        except stripe.error.StripeError as e:
            current_app.logger.error(f"Stripe error: {str(e)}")
            raise

    def detach_payment_method(self, payment_method_id: str) -> bool:
        """
        Detach a payment method from a customer
        """
        try:
            self.stripe.PaymentMethod.detach(payment_method_id)
            return True
        except stripe.error.StripeError as e:
            current_app.logger.error(f"Stripe error: {str(e)}")
            raise 