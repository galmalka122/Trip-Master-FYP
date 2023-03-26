package com.hac.finalproject.algorithm;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CompleteGraph {
  /**
   * Number of nodes in the graph.
   */
  private int numNodes;

  /**
   * List of Place objects that represents the nodes in the graph.
   */
  private List<String> places;

  /**
   * A map that stores the adjacency list of the graph. The key is a Place object
   * representing a node, and the value is a map containing the edges and weights
   * between the key node and other nodes.
   */
  private Map<String, Map<String, Double>> adjacencyList;

  /**
   * The CompleteGraph constructor initializes the graph with a list of Place
   * objects.
   *
   * @param places A list of Place objects that represent the nodes in the graph.
   */
  public CompleteGraph(Map<String, Map<String, Double>> places) {
    this.numNodes = places.size();
    this.places = new ArrayList<>(places.keySet());
    this.adjacencyList = places;
  }

  public Map<String, Map<String, Double>> getAdjacencyList() {
    return this.adjacencyList;
  }

  public List<String> getPlacesList() {
    return this.places;
  }

  public int getNumOfNodes() {
    return this.numNodes;
  }

  /**
   * Adds a new Place object to the graph as a node.
   *
   * @param place The Place object to be added to the graph.
   */
  public void addPlace(String place) {
    this.places.add(place);
    this.numNodes += 1;
    this.adjacencyList.put(place, null);
    for (String curPlace : this.adjacencyList.keySet()) {
      this.adjacencyList.get(curPlace).put(place, null);
      adjacencyList.get(place).put(curPlace, place == curPlace ? 0. : null);
    }
  }

  /**
   * Adds a list of Place objects to the graph as nodes.
   *
   * @param places The list of Place objects to be added to the graph.
   */
  void addPlaces(final List<String> places) {
    for (String place : places) {
      if (!this.adjacencyList.containsKey(place))
        this.addPlace(place);
    }
  }

  /**
   * Adds a weight to an edge between two Place objects.
   *
   * @param srcPlace The Place object representing the source node.
   * @param dstPlace The Place object representing the destination node.
   * @param weight   The weight of the edge.
   */
  void addWeight(String srcPlace, String dstPlace, double weight) {
    this.adjacencyList.get(srcPlace).put(dstPlace, weight);
  }

  void addWeights(String srcPlace, Map<String, Double> dist) {

    this.adjacencyList.put(srcPlace, dist);

  }
}
