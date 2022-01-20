# Spacestagram

### Demo Link: https://stark-cove-99246.herokuapp.com/

Spacestagram allows users to view some of the most beautiful, highest fidelity photographs of outer space in the world, courtesy of NASA's Astronomy Photo of the Day API. 

Spacestagram was built with React, Redux, Node, Express, MongoDB, and CSS. A few tools used in the construction of Spacestagram were axios, JSONWebTokens, and Figma.

Design files used to mockup Spacestagram for desktop, mobile, and tablet views can be found below: 
[Spacetagram.pdf](https://github.com/alto4/spacestagram/files/7832380/Spacetagram.pdf)

Once initial mockups were created, I proceeded to create a simple backend API using Node, Express and MongoDB to support authentication and store dates that each user has liked photos from in the past. 

I also added a route to retrieve the API key used to fetch data from NASA's Astronomy Photo of the Day API to avoid leaving it in the front-end code.

Once the basic server was setup, I began creating the feed components that render individual posts. A couple of features I incorporated into the feed include a loading spinner, the ability to search by keyword, a date filter, as well and infinite scroll effect by fetching 10 more days of photos once the user reaches the bottom of the viewport. 

Although I kept the design to a minimum, I made an effort to ensure the app is functional and renders well in desktop, tablet, and mobile views.

For your convenience, there is an option to create a new account that will try to pull a profile image from gravatar to display on the feed, as well as store your liked photos. There is also an option to skip the authentication process by entering via a demo account. 

Finally, this app was deployed using Heroku. 

## Resources

#### Requirements: https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit#

#### NASA Astronomy Photo of the Day Documentation: https://api.nasa.gov/#apod
