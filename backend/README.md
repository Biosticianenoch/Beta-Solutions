# DataQuest Solutions Backend

This is the backend API for the DataQuest Solutions platform, built with Flask and SQLAlchemy.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration

4. Initialize the database:
```bash
python init_db.py
```

5. Run the development server:
```bash
python run.py
```

The server will be available at `http://localhost:5000`.

## API Endpoints

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/<course_id>` - Get course details

### Payments
- `POST /api/payment/create-payment-intent` - Create a payment intent
- `POST /api/payment/confirm-payment` - Confirm a payment
- `GET /api/payment/payment-methods` - List saved payment methods
- `DELETE /api/payment/payment-methods/<payment_method_id>` - Delete a payment method

## Deployment

The application is configured for deployment on Heroku. The `Procfile` specifies the command to run the application using Gunicorn.

### Environment Variables
- `SECRET_KEY` - Flask secret key
- `DATABASE_URL` - Database connection URL
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## Development

### Database Migrations
To create a new migration:
```bash
flask db migrate -m "Description of changes"
```

To apply migrations:
```bash
flask db upgrade
```

### Running Tests
```bash
python -m pytest
```

## License

This project is licensed under the MIT License. 