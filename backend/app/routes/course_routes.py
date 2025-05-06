from flask import Blueprint, jsonify, current_app, send_from_directory
from app.models.course import Course
from app import db
import os

course_bp = Blueprint('course', __name__)

@course_bp.route('/courses', methods=['GET'])
def get_courses():
    try:
        courses = Course.query.all()
        return jsonify([{
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'category': course.category,
            'level': course.level,
            'duration': course.duration,
            'pdfUrl': course.pdf_url,
            'thumbnailUrl': course.thumbnail_url,
            'instructor': course.instructor,
            'price': course.price,
            'rating': course.rating,
            'enrolledStudents': course.enrolled_students,
            'lastUpdated': course.last_updated.isoformat() if course.last_updated else None,
            'objectives': course.objectives,
            'skills': course.skills,
            'tags': course.tags
        } for course in courses])
    except Exception as e:
        current_app.logger.error(f"Error fetching courses: {str(e)}")
        return jsonify({'error': str(e)}), 500

@course_bp.route('/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({'error': 'Course not found'}), 404
            
        return jsonify({
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'category': course.category,
            'level': course.level,
            'duration': course.duration,
            'pdfUrl': course.pdf_url,
            'thumbnailUrl': course.thumbnail_url,
            'instructor': course.instructor,
            'price': course.price,
            'rating': course.rating,
            'enrolledStudents': course.enrolled_students,
            'lastUpdated': course.last_updated.isoformat() if course.last_updated else None,
            'objectives': course.objectives,
            'skills': course.skills,
            'tags': course.tags
        })
    except Exception as e:
        current_app.logger.error(f"Error fetching course: {str(e)}")
        return jsonify({'error': str(e)}), 500

@course_bp.route('/courses/<course_id>/pdf', methods=['GET'])
def get_course_pdf(course_id):
    try:
        course = Course.query.get(course_id)
        if not course:
            return jsonify({'error': 'Course not found'}), 404

        # Get the PDF file path
        pdf_path = os.path.join(current_app.config['UPLOAD_FOLDER'], os.path.basename(course.pdf_url))
        
        if not os.path.exists(pdf_path):
            return jsonify({'error': 'PDF file not found'}), 404

        return send_from_directory(
            os.path.dirname(pdf_path),
            os.path.basename(pdf_path),
            as_attachment=True,
            mimetype='application/pdf'
        )
    except Exception as e:
        current_app.logger.error(f"Error serving PDF: {str(e)}")
        return jsonify({'error': str(e)}), 500 