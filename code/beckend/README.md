# Spring Backend - TripMaster API

This is the backend server for the TripMaster web application built using the Spring framework. The API provides various endpoints to handle user authentication, trip management, and route optimization using JSON Web Tokens (JWT) for secure authentication.

## Endpoints

### Authentication

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Authenticate user credentials and obtain an access token.
- **POST /api/auth/refresh-token:** Refresh the user's access token after it becomes invalid.

### Trips

- **GET /api/trips:** Get all trips.
- **GET /api/trips/{tripId}:** Get details for a specific trip.
- **POST /api/trips:** Create a new trip.
- **PUT /api/trips/{tripId}:** Update an existing trip.
- **DELETE /api/trips/{tripId}:** Delete a trip.

### Places

- **GET /api/trips/{tripId}/places:** Get all places for a specific trip.
- **POST /api/trips/{tripId}/places:** Add a new place to a trip.
- **DELETE /api/trips/{tripId}/places/{placeId}:** Delete a place from a trip.

### Daily Itinerary

- **PUT /api/trips/{tripId}/places/{day}:** Update all places for a specific day in a trip.
- **PUT /api/trips/{tripId}/places/{day}/{placeId}:** Update a specific place for a specific day in a trip.

### Route Optimization

- **POST /api/calculate:** Calculate the best route for a trip itinerary.

## Setup

To start the Spring backend server, follow these steps:

1. Set up the `application.properties` file with the following configurations:

   ```properties
   ###############Spring Settings##############
   spring.data.mongodb.uri= YOUR_MONGODB_URI
   spring.data.mongodb.database= YOUR_MONGODB_DATABASE_NAME
   logging.level.com.abc.app=DEBUG
   logging.level.org.springframework.security=DEBUG

   google.api.key=YOUR_GOOGLE_API_KEY

   ###############Server Settings##############
   server.port=8090
   server.session.cookie.http-only=true

   ###############Models Settings##############
   lombok.nonNull.exceptionType=IllegalArgumentException
   spring.jackson.date-format=EEE MMM dd yyyy

   ###############JWT Settings##############
   app.jwt.access-token.expiration=120000
   app.jwt.refresh-token.expiration=86400000
   app.jwt.secret-key= YOUR_SECRET_KEY

2. Run the Spring command to start the server. The server will listen on port 8090:
    
   
    spring run path/to/your/Application.java

Make sure to replace path/to/your/Application.java with the actual path to your Spring application entry point.

## Dependencies
- Spring Boot
- Spring Data MongoDB
- Spring Security
- MongoDB (configured with provided MongoDB URI)
- Lombok
- Jackson (for date formatting)
- JSON Web Tokens (JWT) for authentication
## Conclusion 
With this Spring-based backend server, your TripMaster web application is now ready to handle user authentication, trip management, and route optimization. Have a great time planning and optimizing trips for your users! 🗺️🚀



   


