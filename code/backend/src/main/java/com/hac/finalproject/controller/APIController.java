package com.hac.finalproject.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hac.finalproject.algorithm.CompleteGraph;
import com.hac.finalproject.algorithm.TravelingSalesman;
import com.hac.finalproject.compnent.JwtTokenProvider;
import com.hac.finalproject.repos.User.User;
import com.hac.finalproject.repos.User.UserService;
import com.hac.finalproject.repos.place.Place;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin
public class APIController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  @PostMapping("/user/create")
  public ResponseEntity<String> createUser(@RequestBody User user) {
    try {
      userService.signup(user);
      return new ResponseEntity<>("registered successfully", HttpStatus.CREATED);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping(path = "/user/login")
  public ResponseEntity<String> login(@RequestBody String loginParams,
      HttpServletResponse response) {
    JsonReader jsonReader = Json.createReader(new StringReader(loginParams));
    JsonObject object = jsonReader.readObject();
    jsonReader.close();

    // check the user credentials against the data store
    User user = userService.findByUsernameAndPassword(
        object.getString("username"),
        object.getString("password"));
    if (user == null) {
      // return an error message if the credentials are invalid
      return new ResponseEntity<>("Invalid username or password", HttpStatus.BAD_REQUEST);
    }

    // generate an authentication token
    String token = jwtTokenProvider.createToken(user.getUsername());

    response.addHeader("Authorization", token.toString());
    response.addHeader("Access-Control-Allow-Credentials", "true");
    // redirect the user to the home page
    return new ResponseEntity<>("Login successfully to" + user.getUsername(), HttpStatus.OK);
  }

  @GetMapping("/place/details")
  public ResponseEntity<String> getPlaceDetails(@RequestParam String place_id, @RequestParam String fields,
      @RequestParam String key) {
    try {
      URL url = new URL("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + place_id + "&fields="
          + fields + "&key=" + key);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");
      con.setRequestProperty("Content-Type", "application/json");
      con.setRequestProperty("Access-Control-Allow-Origin", "*");
      BufferedReader in = new BufferedReader(
          new InputStreamReader(con.getInputStream()));
      String inputLine;
      StringBuffer content = new StringBuffer();
      while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
      }
      in.close();
      return new ResponseEntity<>(content.toString(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("BAD", HttpStatus.OK);
    }
  }

  @PostMapping("/place/distance")
  public ResponseEntity<String> calculateRoute(@RequestBody String places,
      HttpServletResponse response) {

    JsonReader jsonReader = Json.createReader(new StringReader(places));
    JsonArray object = jsonReader.readArray();
    jsonReader.close();

    Map<String, Map<String, Double>> adjencyList = new HashMap<>();
    List<Place> placesList = new ArrayList<>();
    for (int i = 0; i < object.size(); i++) {
      Place cur = new Place();
      cur.setAddress(object.get(i).asJsonObject().getString("address"));
      cur.setAltitude(Double.parseDouble(object.get(i).asJsonObject().get("latitude").toString()));
      cur.setLongitude(Double.parseDouble(object.get(i).asJsonObject().get("longitude").toString()));
      cur.setName(object.get(i).asJsonObject().getString("name"));
      cur.setRate(Double.parseDouble(object.get(i).asJsonObject().get("rating").toString()));
      placesList.add(cur);
      JsonObject distances = object.get(i).asJsonObject().get("distances").asJsonObject();
      Map<String, Double> ds = new HashMap<>();
      Iterator<String> keys = distances.keySet().iterator();
      while (keys.hasNext()) {
        String key = keys.next();
        Double value = Double.parseDouble(distances.asJsonObject().get(key).toString());
        System.out.println("Key: " + key + ", Value: " + value);
        ds.put(key, value);
        adjencyList.put(cur.getName(), ds);
      }
    }
    try {
      CompleteGraph g = new CompleteGraph(adjencyList);
      TravelingSalesman t = new TravelingSalesman(g);
      List<String> solTSP = t.tsp();
      return new ResponseEntity<>(solTSP.toString(), HttpStatus.OK);
    } catch (Exception ex) {
      return new ResponseEntity<>(ex.getMessage(), HttpStatus.OK);
    }
  }
}
