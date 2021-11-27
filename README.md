# RESTful-API-Uptime-Monitoring-App

# Boahen Elijah Owusu Ewooral owns the design, coding and hosting of this project.

## I am building a RESTful API for an uptime monitoring application using no npm module nor dependencies but rather just a large chunk of the features available in the Node JS library. I will add some tests and refactor a little bit to make this application better and a bit robust overall.

# What is an UPTIME MONITOR?
* An uptime monitor allows users to enter URLs they want monitored, and receive alerts when those resources go down or come back up. 

* The App will be useable, so I'll include features such as sign-up and sign-in.

* Users will also have their Up and DOWN alerts via SMS, rather than email. 

# FUNCTIONALITIES IN THIS API
* This Api will listen on a PORT and accept incoming HTTP requests for POST, GET, PUT, DELETE, and HEAD 

* The API will allow clients to connect, then create a new user, edit and finally delete the user.

* The API will allow a user to sign in which gives them a token that they can use for subsequent authenticated requests.

* The API will allow the user to sign out which invalidates their token.

* The API will allow signed in users to use their token to create a new "check", and by check, we mean a task for the system to check a given URL to see if it is UP or DOWN. The user will also be able to define what UP or DOWN is. 

* The API will allow a signed-in user to edit or delete any of their checks and we will limit their checks to five 

* In the background, workers will perform all the "checks" at the appropriate time, and send alerts to the users when a check changes its state from "UP" to "DOWN", or vise-versa

* The checks will run once per minute.