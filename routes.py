"""
Routes and views for the bottle application.
"""

from bottle import route, view
from datetime import datetime
from floyd import floyd_warshall

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/contact')
@view('contact')
def contact():
    """Renders the contact page."""
    return dict(
        title='Contact',
        message='Your contact page.',
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    """Renders the about page."""
    return dict(
        title='About',
        message='Your application description page.',
        year=datetime.now().year
    )

@route('/Task1')
@view('task1')
def about():
    """Renders the about page."""
    return dict(
        title='Task 1',
        message='Grigorieva',
        year=datetime.now().year
    )

@route('/Task2')
@view('task2')
def about():
    """Renders the about page."""
    return dict(
        title='Task 2',
        message='Rastrygina',
        year=datetime.now().year
    )

@route('/test3')
@view('test3')
def about():

    return dict(
        title='Task 3',
        message='Ivanov',
        year=datetime.now().year
    )

