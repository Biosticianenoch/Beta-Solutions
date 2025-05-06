# DataQuest Solutions

A comprehensive platform for data science and analysis courses, built with React (Vite) and Flask.

## Live Demo

Visit our live application at: [DataQuest Solutions](https://data-quest-solutions-git-main-enocks-projects-27f604c8.vercel.app)

## Project Structure

```
DataQuest-Solutions/
├── frontend/           # React (Vite) frontend application
├── backend/           # Flask backend API
└── courses resorses/  # Course PDF resources
```

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DataQuest-Solutions.git
cd DataQuest-Solutions
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
python run.py
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Features

- Course browsing and searching
- PDF course material downloads
- User authentication and authorization
- Payment processing with Stripe
- Responsive design for all devices
- Course filtering and sorting
- Learning progress tracking

## Technology Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### Backend
- Flask (Python)
- SQLAlchemy for database ORM
- Flask-Migrate for database migrations
- Flask-CORS for CORS support
- Stripe for payment processing

## Development

### Environment Variables

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_AUTH_TOKEN_KEY=auth_token
VITE_USER_DATA_KEY=user_data
```

#### Frontend (.env.production)
```
VITE_API_URL=https://data-quest-solutions-api.vercel.app
VITE_AUTH_TOKEN_KEY=auth_token
VITE_USER_DATA_KEY=user_data
```

#### Backend (.env)
```
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///app.db
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Database Management

Initialize the database:
```bash
cd backend
python init_db.py
```

Run migrations:
```bash
flask db migrate -m "Description of changes"
flask db upgrade
```

### Adding New Courses

1. Place PDF files in the `courses resorses` directory
2. Update the course data in `backend/scripts/populate_courses.py`
3. Run the database initialization script:
```bash
python init_db.py
```

## Deployment

### Backend Deployment (Vercel)
1. Set up a PostgreSQL database
2. Configure environment variables in Vercel dashboard
3. Deploy using Vercel CLI:
```bash
vercel
```

### Frontend Deployment (Vercel)
1. Build the production version:
```bash
npm run build
```
2. Deploy to Vercel:
```bash
vercel
```

The application is automatically deployed to:
- Frontend: https://data-quest-solutions-git-main-enocks-projects-27f604c8.vercel.app
- Backend API: https://data-quest-solutions-api.vercel.app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.