from app import create_app, db
from scripts.populate_courses import populate_courses

def init_db():
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Populate courses
        populate_courses()
        
        print("Database initialized successfully!")

if __name__ == '__main__':
    init_db() 