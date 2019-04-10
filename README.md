# Restaurant Suggestion App

## About
This app allows a user to make an account with a username and password and lets them search for restaurants based off of a term and location. The user is returned with the top five businesses that match their search.

## How to Use

**API Keys:** Go to www.yelp.com/developers to obtain an API key

**Node Packages:** Express, ejs, body-parser, request, yelp-fusion

**Installing and Running the App:**
1. Download the files
2. Obtain API key
3. Install node packages
4. Create a config file containing your API key
5. Run your code
6. Open up localhost

**How the App Works in the Browser**
* /home: Homepage (Starting route)
* /login: Login to your account
* /create: Create an account
* /search: Search for a restaurant (This route can only be accessed through the login page, you must login in order to be able to search for restaurants)

## Notes
* Since Yelp is not limited to just food, you may get locations that are not restuarants

## Future Things
* Saving certain restaurants to your account
* Add ways to access your account