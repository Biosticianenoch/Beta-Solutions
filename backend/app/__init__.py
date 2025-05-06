from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Register blueprints
    from app.routes.course_routes import course_bp
    from app.routes.payment_routes import payment_bp
    
    app.register_blueprint(course_bp, url_prefix='/api')
    app.register_blueprint(payment_bp, url_prefix='/api/payment')

    return app 