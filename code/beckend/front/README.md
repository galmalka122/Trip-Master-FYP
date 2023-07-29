# React TripMaster Web Application

This is a web application built with React that allows users to plan their trips by creating daily itineraries with attractions and obtaining the best route for each day. The application communicates with a backend server to fetch data and optimize the trip itineraries based on the user's preferences.

## Features

- **Trip Creation:** Users can create a new trip by filling out a form with details such as trip name, start date, end date, and other relevant information.

- **Attraction Search:** For each day of the trip, users can search for nearby places and add attractions to the itinerary. Attractions will display photos, opening hours, brief descriptions, and ratings.

- **Attraction Details:** Users can view detailed information about each attraction, including photos, opening hours, brief descriptions, and ratings.

- **Attraction Customization:** For each attraction added to the itinerary, the user can set the duration time, interest level (on a scale of 1 to 10), and priority (on a scale of 1 to 10).

- **Trip Itinerary Configuration:** Users can set the origin, starting time, ending time (optional; default set to midnight), and destination (optional; default set to the origin) for each day's itinerary.

- **Route Optimization:** After all attractions have been added and configured, the user can request the backend to optimize the best route for the attractions, considering their preferences and constraints.

- **Map with Directions:** The application displays a map with the optimized route for each day, providing the user with the best path to follow.

## Setup

To run the React app, follow these steps:

1. Clone the repository and navigate to the project directory.

2. Install the required packages by running the following command:
3. Create a `.env` file in the root directory of the project.

4. Obtain API keys from the following services and add them to the `.env` file:

- Google Maps API Key (for map display and directions)
- TripAdvisor API Key (for attraction details)
- Foursquare API Key (for attraction search)
- OpenAI API Key (for any natural language processing, if applicable)
- VisualCrossing API Key (for weather data, if applicable)

Example `.env` file:

    
    REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    REACT_APP_TRIPADVISOR_API_KEY=YOUR_TRIPADVISOR_API_KEY
    REACT_APP_FOURSQUARE_API_KEY=YOUR_FOURSQUARE_API_KEY
    REACT_APP_OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    REACT_APP_VISUALCROSSING_API_KEY=YOUR_VISUALCROSSING_API_KEY
    REACT_APP_BASE_URL=http://localhost:8090
    PORT=8081

5. Once the environment variables are set, start the development server:
    
        npm install
        npm start

The application should now be accessible at `http://localhost:8091` in your web browser.

## Backend

Please note that this README assumes the existence of a separate backend server responsible for handling data storage, route optimization, and API interactions with TripAdvisor, Foursquare, OpenAI, and VisualCrossing. Make sure your backend is properly configured and accessible from the React application.

## Dependencies

- React
- React Router (if applicable for navigation)
- Axios (for making API requests)
- Google Maps API (for displaying maps and obtaining directions)
- TripAdvisor API (for attraction details)
- Foursquare API (for attraction search)
- OpenAI API (if applicable for any natural language processing)
- VisualCrossing API (if applicable for weather data)

## Conclusion

With this React Trip Planner web application, users can easily create and customize their trip itineraries, explore nearby attractions, and get optimized routes for an unforgettable travel experience. Have a great trip! 🚀🗺️
