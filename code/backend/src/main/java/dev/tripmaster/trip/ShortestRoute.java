package dev.tripmaster.trip;

import java.util.ArrayList;
import java.util.List;

public class ShortestRoute {
    public List<Integer> tsp(int start, int end, List<List<Integer>> places) {

        int numPlaces = places.size();
        List<Integer> unvisited = new ArrayList<>();
        for (int i = 0; i < numPlaces; i++) {
            if (i != start && i != end) {
                unvisited.add(i);
            }
        }

        int currentPlace = start;
        List<Integer> path = new ArrayList<>();
        int pathIndex = 0;
        path.set(pathIndex++, currentPlace);

        while (!unvisited.isEmpty()) {
            int nearestNeighbor = -1;
            int nearestDistance = Integer.MAX_VALUE;

            for (int neighbor : unvisited) {
                int distance = places.get(currentPlace).get(neighbor);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestNeighbor = neighbor;
                }
            }

            path.set(pathIndex++, nearestNeighbor);
            unvisited.remove(nearestNeighbor);
            currentPlace = nearestNeighbor;
        }

        path.set(pathIndex, end);
        return path;
    }
}


