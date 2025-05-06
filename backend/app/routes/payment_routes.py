from flask import Blueprint, request, jsonify, current_app
from app.services.payment_service import PaymentService
from app.utils.auth import login_required
from app.models.user import User
from app.models.course import Course
from app import db
import stripe

payment_bp = Blueprint('payment', __name__)
payment_service = PaymentService()

@payment_bp.route('/create-payment-intent', methods=['POST'])
@login_required
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data.get('amount')
        course_id = data.get('course_id')
        customer_id = data.get('customer_id')
        
        if not amount or not course_id:
            return jsonify({'error': 'Amount and course_id are required'}), 400

        # Create payment intent
        intent_data = payment_service.create_payment_intent(amount, customer_id=customer_id)
        
        return jsonify({
            'client_secret': intent_data['client_secret'],
            'payment_intent_id': intent_data['payment_intent_id']
        })
    except Exception as e:
        current_app.logger.error(f"Error creating payment intent: {str(e)}")
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/confirm-payment', methods=['POST'])
@login_required
def confirm_payment():
    try:
        data = request.get_json()
        payment_intent_id = data.get('payment_intent_id')
        course_id = data.get('course_id')
        save_payment_method = data.get('save_payment_method', False)
        
        if not payment_intent_id or not course_id:
            return jsonify({'error': 'Payment intent ID and course ID are required'}), 400

        # Confirm payment
        payment_data = payment_service.confirm_payment(payment_intent_id)
        
        if payment_data['status'] == 'succeeded':
            # Get current user
            user = User.query.get(request.user_id)
            course = Course.query.get(course_id)
            
            if not course:
                return jsonify({'error': 'Course not found'}), 404
            
            # Add course to user's enrolled courses
            user.enrolled_courses.append(course)
            
            # If user wants to save payment method
            if save_payment_method and user.stripe_customer_id:
                payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
                if payment_intent.payment_method:
                    payment_service.attach_payment_method(
                        user.stripe_customer_id,
                        payment_intent.payment_method
                    )
            
            db.session.commit()
            
            return jsonify({
                'status': 'success',
                'message': 'Payment confirmed and course enrolled'
            })
        else:
            return jsonify({
                'status': 'failed',
                'message': 'Payment not successful'
            }), 400
            
    except Exception as e:
        current_app.logger.error(f"Error confirming payment: {str(e)}")
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/payment-methods', methods=['GET'])
@login_required
def get_payment_methods():
    try:
        user = User.query.get(request.user_id)
        if not user.stripe_customer_id:
            return jsonify([])

        payment_methods = payment_service.get_saved_payment_methods(user.stripe_customer_id)
        return jsonify(payment_methods)
    except Exception as e:
        current_app.logger.error(f"Error getting payment methods: {str(e)}")
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/payment-methods/<payment_method_id>', methods=['DELETE'])
@login_required
def delete_payment_method(payment_method_id):
    try:
        user = User.query.get(request.user_id)
        if not user.stripe_customer_id:
            return jsonify({'error': 'No customer ID found'}), 400

        success = payment_service.detach_payment_method(payment_method_id)
        return jsonify({'success': success})
    except Exception as e:
        current_app.logger.error(f"Error deleting payment method: {str(e)}")
        return jsonify({'error': str(e)}), 500 