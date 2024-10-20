'''
Flask module to query movies information from TMDB API.
It uses API Key to authenticate user. The Key is saved in env variable.
'''

# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request, render_template
import requests
from dotenv import load_dotenv
import os

#Load env file
load_dotenv()

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world(): 
    '''
    Principal view to user, shows popular movies
    '''       

    #Load tmdb key from env file
    secret_key = SECRET_KEY = os.getenv("TMDBKEY")

    url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
    headers = {
        "accept": "application/json",
        "Authorization": secret_key
    }
    response = requests.get(url, headers=headers)
    response = response.json()
    response = response['results']   

    return render_template("index.html", movieResults = response)

#Function to search movies by name and return ratings
@app.route('/ratings', methods=['POST'])
# ‘/ratings’ URL is bound with get_ratings() function.
def get_ratings():
    '''
    Function to search movies by name and returns ratings
    '''
    response = []
    movie_name = request.form['movie_name']

    #Load tmdb key from env file
    secret_key = SECRET_KEY = os.getenv("TMDBKEY")

    if is_empty(movie_name):
        print("valor vacio, array vacio será devuelto")        
    else:
        movie_name = movie_name.replace(" ", "+")

        url = "https://api.themoviedb.org/3/search/movie?query=" + movie_name
        headers = {
            "accept": "application/json",
            "Authorization": secret_key
        }
        response = requests.get(url, headers=headers)
        response = response.json()
        response = response['results']

    return render_template("index.html", movieResults = response)


def is_empty(val):
    '''
    Function to validate if given value is empty
    '''
    flag = False
    if val == "" or val == " ":
        flag = True
    return flag

# main driver function
if __name__ == '__main__':
    '''
    Aditional entry point
    '''
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()