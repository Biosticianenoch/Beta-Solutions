import os
import shutil
from app import create_app

def copy_pdfs():
    app = create_app()
    with app.app_context():
        # Create uploads directory if it doesn't exist
        uploads_dir = app.config['UPLOAD_FOLDER']
        os.makedirs(uploads_dir, exist_ok=True)

        # Source directory containing PDF files
        source_dir = '/home/crimzor/Documents/repos,,,,,,,/DataQuest-Solutions/courses resorses'

        # Copy each PDF file to the uploads directory
        for filename in os.listdir(source_dir):
            if filename.endswith('.pdf'):
                source_path = os.path.join(source_dir, filename)
                dest_path = os.path.join(uploads_dir, filename)
                shutil.copy2(source_path, dest_path)
                print(f"Copied {filename} to uploads directory")

        print("All PDF files copied successfully!")

if __name__ == '__main__':
    copy_pdfs() 