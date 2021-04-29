##Inspiration
This project is inspired from the current situation in many countries where people are looking for an opportunity to travel but are unsure on doing so due to the current ongoing pandemic. In lots of places people do not follow covid safety guidelines and we should ensure proper precautions while going to such places.

##What it does
The application has a mapbox via which the user can select a location through the given marker. This gives a modal pop-up which gives the covid rating for the surrounding locations. The covid rating of a place is a parameter which represents how often do people follow covid safety protocols. This would help the user know whether it is safe to visit these places in this covid era.

##How we built it
We built it using node, express.js , react, mongodb. We built this on top of mapbox api and foursquare api.

##Challenges we ran into
We had a major problem with axios where we were not able to communicate with the api. This caused a big issue initially, however we were able to solve it.
We ran into time constraint issues due to which we were not able to complete the project
Accomplishments that we're proud of
We were able to associate a covid rating with all points of interests near some locations which are visited by a lot of people. We also are on the path to associate a covid rating with all points of interests near all locations.
We were able to integrate mapbox into react and seed covid ratings into the database using location ids of foursquare api.
What we learned
We learnt about integrating mapbox with react and foursquare api. By debugging more bugs in axios, we also got more proficient in axios as well.

##What's next for SafeExcursions
A better UI which show's each locations covid rating by mouse hover.
A more efficient backend which allows us to seed multiple points of interests onto the database so that we could store more covid ratings and help the users to know whether these points of interests are safe to travel to.
This platform would also have experiences of people to visit these point of interests. These blogs by users can help other users take necessary precautions. *Implement user authentication and the ability to add covid rating and comments for a particular place
