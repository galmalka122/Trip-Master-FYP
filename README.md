# TripMaster - Plan and Optimize Your Travel Itinerary

TripMaster is a full-stack web application that helps users plan and optimize their travel itineraries. It consists of both a React frontend for the user interface and a Spring-based backend API to handle user authentication, trip management, and route optimization.

## Features

- **User Registration and Authentication:** Users can register for an account and log in to access personalized trip planning features.

- **Trip Creation and Management:** Users can create new trips, update existing trips, and delete trips as needed.

- **Attraction Search and Details:** For each day of the trip, users can search for nearby attractions and view detailed information such as photos, opening hours, descriptions, and ratings.

- **Attraction Customization:** Users can customize each attraction by setting the duration time, interest level, and priority.

- **Daily Itinerary Configuration:** Users can configure the daily itinerary, including the origin, starting time, ending time, and destination for each day.

- **Route Optimization:** The backend API provides route optimization to find the best path for each day's itinerary, taking into account user preferences and constraints.

- **Map with Directions:** The application displays a map with the optimized route, providing the user with clear directions for each day's travel.

## Frontend - React Web Application

The frontend of TripMaster is built using React, a popular JavaScript library for building user interfaces. It allows users to interact with the application, create trips, search for attractions, and customize their itineraries.

To start the frontend application, follow these steps:

1. Clone the repository and navigate to the frontend project directory.

2. Install the required packages by running the following command:


      npm install

3. Create a `.env` file in the root directory of the frontend project.

4. Obtain API keys from the following services and add them to the `.env` file:

- Google Maps API Key (for map display and directions)
- TripAdvisor API Key (for attraction details)
- Foursquare API Key (for attraction search)
- OpenAI API Key (if applicable for any natural language processing)
- VisualCrossing API Key (if applicable for weather data)

Example `.env` file:

      REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
      REACT_APP_TRIPADVISOR_API_KEY=YOUR_TRIPADVISOR_API_KEY
      REACT_APP_FOURSQUARE_API_KEY=YOUR_FOURSQUARE_API_KEY
      REACT_APP_OPENAI_API_KEY=YOUR_OPENAI_API_KEY
      REACT_APP_VISUALCROSSING_API_KEY=YOUR_VISUALCROSSING_API_KEY    


5. Once the environment variables are set, start the development server:

        npm start


The application should now be accessible at `http://localhost:8091` in your web browser.

## Backend - Spring-based TripMaster API

The backend of TripMaster is built using the Spring framework. It handles user authentication, trip management, and route optimization. The API provides various endpoints to interact with the frontend and the database.

To start the backend server, follow these steps:

1. Set up the `application.properties` file with the provided configurations in the backend project.

2. Run the Spring command to start the server. The server will listen on port 8090:

           ./mvnw spring-boot:run


Make sure to replace `path/to/your/Application.java` with the actual path to your Spring application entry point.

## Dependencies

- Frontend:
- React
- React Router (if applicable for navigation)
- Axios (for making API requests)
- Google Maps API (for displaying maps and obtaining directions)
- TripAdvisor API (for attraction details)
- Foursquare API (for attraction search)
- OpenAI API (if applicable for any natural language processing)
- VisualCrossing API (if applicable for weather data)

- Backend:
- Spring Boot
- Spring Data MongoDB
- Spring Security
- MongoDB (configured with provided MongoDB URI)
- Lombok
- Jackson (for date formatting)
- JSON Web Tokens (JWT) for authentication

## Conclusion

With TripMaster, planning and optimizing your travel itineraries becomes a breeze. Whether you're exploring new places or rediscovering old favorites, let TripMaster guide you on your next adventure. Have a fantastic trip! 🗺️🚀


