import os
from app import create_app, db
from app.models.course import Course

def populate_courses():
    app = create_app()
    with app.app_context():
        # Clear existing courses
        Course.query.delete()
        
        # Course data based on PDF files
        courses = [
            {
                'title': 'Graphic Design with CANVA',
                'description': 'Learn professional graphic design using CANVA, a powerful and user-friendly design tool.',
                'category': 'Design',
                'level': 'Beginner',
                'duration': '4 weeks',
                'pdf_url': '/courses/Graphic Design with CANVA.pdf',
                'instructor': 'Design Team',
                'price': 49.99,
                'rating': 4.5,
                'objectives': ['Master CANVA interface', 'Create professional designs', 'Design for social media'],
                'skills': ['CANVA', 'Graphic Design', 'Social Media Design'],
                'tags': ['design', 'canva', 'graphic-design']
            },
            {
                'title': 'Data Collection using ODK',
                'description': 'Master data collection techniques using Open Data Kit (ODK), a powerful mobile data collection tool.',
                'category': 'Data Collection',
                'level': 'Intermediate',
                'duration': '3 weeks',
                'pdf_url': '/courses/Data Collection using ODK.pdf',
                'instructor': 'Data Collection Team',
                'price': 39.99,
                'rating': 4.3,
                'objectives': ['Set up ODK forms', 'Collect field data', 'Manage data submissions'],
                'skills': ['ODK', 'Data Collection', 'Mobile Forms'],
                'tags': ['data-collection', 'odk', 'field-research']
            },
            {
                'title': 'Data Collection with KoBo Toolbox',
                'description': 'Learn to use KoBo Toolbox for efficient mobile data collection and management.',
                'category': 'Data Collection',
                'level': 'Intermediate',
                'duration': '3 weeks',
                'pdf_url': '/courses/Data Collection with KoBo ToolBoox.pdf',
                'instructor': 'Data Collection Team',
                'price': 39.99,
                'rating': 4.4,
                'objectives': ['Create KoBo forms', 'Deploy surveys', 'Analyze collected data'],
                'skills': ['KoBo Toolbox', 'Survey Design', 'Data Management'],
                'tags': ['data-collection', 'kobo', 'surveys']
            },
            {
                'title': 'Data Collection Using Commcare',
                'description': 'Master mobile data collection and case management using CommCare platform.',
                'category': 'Data Collection',
                'level': 'Intermediate',
                'duration': '4 weeks',
                'pdf_url': '/courses/Data Collection Using Commcare.pdf',
                'instructor': 'Data Collection Team',
                'price': 44.99,
                'rating': 4.2,
                'objectives': ['Build CommCare applications', 'Manage cases', 'Monitor field activities'],
                'skills': ['CommCare', 'Case Management', 'Mobile Data Collection'],
                'tags': ['data-collection', 'commcare', 'case-management']
            },
            {
                'title': 'Qualitative Data Analysis using Dedoose',
                'description': 'Learn to analyze qualitative data effectively using Dedoose software.',
                'category': 'Data Analysis',
                'level': 'Advanced',
                'duration': '5 weeks',
                'pdf_url': '/courses/Qualitative Data Analysis using Dedoose.pdf',
                'instructor': 'Analysis Team',
                'price': 59.99,
                'rating': 4.6,
                'objectives': ['Code qualitative data', 'Conduct thematic analysis', 'Generate insights'],
                'skills': ['Dedoose', 'Qualitative Analysis', 'Thematic Coding'],
                'tags': ['qualitative', 'dedoose', 'data-analysis']
            },
            {
                'title': 'Qualitative Data Analysis using NVIVO',
                'description': 'Master qualitative data analysis using NVIVO, a powerful research software.',
                'category': 'Data Analysis',
                'level': 'Advanced',
                'duration': '5 weeks',
                'pdf_url': '/courses/Qualitative Data Analysis using NVIVO.pdf',
                'instructor': 'Analysis Team',
                'price': 59.99,
                'rating': 4.7,
                'objectives': ['Import and organize data', 'Code and analyze', 'Visualize findings'],
                'skills': ['NVIVO', 'Qualitative Analysis', 'Research Methods'],
                'tags': ['qualitative', 'nvivo', 'data-analysis']
            },
            {
                'title': 'Survival Analysis with R',
                'description': 'Learn survival analysis techniques using R programming language.',
                'category': 'Statistics',
                'level': 'Advanced',
                'duration': '6 weeks',
                'pdf_url': '/courses/Survival Analysis with R.pdf',
                'instructor': 'Statistics Team',
                'price': 69.99,
                'rating': 4.8,
                'objectives': ['Understand survival data', 'Fit survival models', 'Interpret results'],
                'skills': ['R', 'Survival Analysis', 'Statistical Modeling'],
                'tags': ['statistics', 'r', 'survival-analysis']
            },
            {
                'title': 'Time Series Analysis with R',
                'description': 'Master time series analysis and forecasting using R.',
                'category': 'Statistics',
                'level': 'Advanced',
                'duration': '6 weeks',
                'pdf_url': '/courses/Time Series Analysis with R.pdf',
                'instructor': 'Statistics Team',
                'price': 69.99,
                'rating': 4.7,
                'objectives': ['Analyze time series data', 'Build forecasting models', 'Evaluate predictions'],
                'skills': ['R', 'Time Series', 'Forecasting'],
                'tags': ['statistics', 'r', 'time-series']
            },
            {
                'title': 'Statistical Analysis with SPSS',
                'description': 'Learn statistical analysis techniques using IBM SPSS software.',
                'category': 'Statistics',
                'level': 'Intermediate',
                'duration': '5 weeks',
                'pdf_url': '/courses/Statistical Analysis with SPSS.pdf',
                'instructor': 'Statistics Team',
                'price': 54.99,
                'rating': 4.5,
                'objectives': ['Perform statistical tests', 'Analyze data', 'Interpret results'],
                'skills': ['SPSS', 'Statistics', 'Data Analysis'],
                'tags': ['statistics', 'spss', 'data-analysis']
            },
            {
                'title': 'Machine Learning with Python',
                'description': 'Master machine learning algorithms and implementation using Python.',
                'category': 'Machine Learning',
                'level': 'Advanced',
                'duration': '8 weeks',
                'pdf_url': '/courses/Machine Learning with Python.pdf',
                'instructor': 'ML Team',
                'price': 79.99,
                'rating': 4.9,
                'objectives': ['Implement ML algorithms', 'Build predictive models', 'Evaluate model performance'],
                'skills': ['Python', 'Machine Learning', 'Data Science'],
                'tags': ['machine-learning', 'python', 'data-science']
            },
            {
                'title': 'Deep Learning with Python',
                'description': 'Learn deep learning techniques and neural networks using Python.',
                'category': 'Machine Learning',
                'level': 'Advanced',
                'duration': '8 weeks',
                'pdf_url': '/courses/Deep Learning with Python.pdf',
                'instructor': 'ML Team',
                'price': 79.99,
                'rating': 4.8,
                'objectives': ['Build neural networks', 'Train deep learning models', 'Apply to real problems'],
                'skills': ['Python', 'Deep Learning', 'Neural Networks'],
                'tags': ['deep-learning', 'python', 'neural-networks']
            },
            {
                'title': 'Advanced Excel',
                'description': 'Master advanced Excel features for data analysis and visualization.',
                'category': 'Data Analysis',
                'level': 'Intermediate',
                'duration': '4 weeks',
                'pdf_url': '/courses/Advanced Excel.pdf',
                'instructor': 'Data Analysis Team',
                'price': 39.99,
                'rating': 4.4,
                'objectives': ['Advanced formulas', 'Data visualization', 'Pivot tables'],
                'skills': ['Excel', 'Data Analysis', 'Visualization'],
                'tags': ['excel', 'data-analysis', 'visualization']
            },
            {
                'title': 'Data Visualization with Tableau and Power BI',
                'description': 'Learn to create compelling data visualizations using Tableau and Power BI.',
                'category': 'Data Visualization',
                'level': 'Intermediate',
                'duration': '5 weeks',
                'pdf_url': '/courses/Data Visualization with Tableau and Power Bi.pdf',
                'instructor': 'Visualization Team',
                'price': 59.99,
                'rating': 4.6,
                'objectives': ['Create interactive dashboards', 'Design visualizations', 'Share insights'],
                'skills': ['Tableau', 'Power BI', 'Data Visualization'],
                'tags': ['visualization', 'tableau', 'power-bi']
            },
            {
                'title': 'Statistical Analysis with STATA',
                'description': 'Master statistical analysis using STATA software.',
                'category': 'Statistics',
                'level': 'Advanced',
                'duration': '6 weeks',
                'pdf_url': '/courses/Statistical analysis with STATA.pdf',
                'instructor': 'Statistics Team',
                'price': 64.99,
                'rating': 4.7,
                'objectives': ['Perform statistical tests', 'Analyze data', 'Generate reports'],
                'skills': ['STATA', 'Statistics', 'Data Analysis'],
                'tags': ['statistics', 'stata', 'data-analysis']
            },
            {
                'title': 'Data Analysis With Python',
                'description': 'Learn data analysis techniques using Python programming language.',
                'category': 'Data Analysis',
                'level': 'Intermediate',
                'duration': '6 weeks',
                'pdf_url': '/courses/Data Analysis With Python.pdf',
                'instructor': 'Data Analysis Team',
                'price': 54.99,
                'rating': 4.6,
                'objectives': ['Data manipulation', 'Statistical analysis', 'Data visualization'],
                'skills': ['Python', 'Pandas', 'Data Analysis'],
                'tags': ['python', 'data-analysis', 'pandas']
            },
            {
                'title': 'Data Analysis With R',
                'description': 'Master data analysis using R programming language.',
                'category': 'Data Analysis',
                'level': 'Intermediate',
                'duration': '6 weeks',
                'pdf_url': '/courses/Data Analysis With R.pdf',
                'instructor': 'Data Analysis Team',
                'price': 54.99,
                'rating': 4.6,
                'objectives': ['Data manipulation', 'Statistical analysis', 'Data visualization'],
                'skills': ['R', 'Tidyverse', 'Data Analysis'],
                'tags': ['r', 'data-analysis', 'statistics']
            }
        ]

        # Add courses to database
        for course_data in courses:
            course = Course(**course_data)
            db.session.add(course)

        db.session.commit()
        print("Courses populated successfully!")

if __name__ == '__main__':
    populate_courses() 