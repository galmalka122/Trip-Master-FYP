package com.hac.finalproject.algorithm;

import java.util.ArrayList;
import java.util.List;

public class TravelingSalesman {
  private CompleteGraph graph;
  private List<String> path = new ArrayList<>();
  private boolean[] visited;
  private double finalCost = Double.MAX_VALUE;

  public TravelingSalesman(CompleteGraph graph) {
    this.graph = graph;
    visited = new boolean[graph.getNumOfNodes()];
  }

  public List<String> tsp() {
    for (int i = 0; i < graph.getNumOfNodes(); i++) {
      String curPlace = graph.getPlacesList().get(i);
      List<String> tempPath = new ArrayList<>(path);
      tempPath.add(curPlace);
      tsp(tempPath, i, visited, curPlace, 0);
    }
    return path;
  }

  private void tsp(List<String> curPath, int index, boolean[] visited, String curPlace, double cost) {
    visited[index] = true;
    if (curPath.size() == graph.getNumOfNodes()) {
      cost += graph.getAdjacencyList().get(curPlace).get(graph.getPlacesList().get(0));
      System.out.println("cost: " + cost);
      if (cost < finalCost) {
        finalCost = cost;
        System.out.println("final cost: " + finalCost);
        path = new ArrayList<>(curPath);
      }
      return;
    }

    for (int i = 0; i < graph.getNumOfNodes(); i++) {
      String nextPlace = graph.getPlacesList().get(i);
      if (!visited[i]) {
        double weight = graph.getAdjacencyList().get(curPlace).get(nextPlace);
        if (weight != 0.) {
          List<String> tempPath = new ArrayList<>(curPath);
          tempPath.add(nextPlace);
          tsp(tempPath, i, visited, nextPlace, cost + weight);
        }
      }
    }

    visited[index] = false;
  }
}
