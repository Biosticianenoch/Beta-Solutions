from app import db
from datetime import datetime

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    level = db.Column(db.String(20), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    pdf_url = db.Column(db.String(500), nullable=False)
    thumbnail_url = db.Column(db.String(500))
    instructor = db.Column(db.String(100))
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    enrolled_students = db.Column(db.Integer, default=0)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)
    objectives = db.Column(db.JSON)
    skills = db.Column(db.JSON)
    tags = db.Column(db.JSON)

    # Relationships
    enrolled_users = db.relationship('User', secondary='user_courses', backref=db.backref('enrolled_courses', lazy='dynamic'))

    def __repr__(self):
        return f'<Course {self.title}>' 