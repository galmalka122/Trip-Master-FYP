package dev.tripmaster.service;

import dev.tripmaster.TripMasterApplication;
import dev.tripmaster.dto.CalculatePlaces;
import dev.tripmaster.dto.CalculateRouteRequest;
import dev.tripmaster.dto.Period;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class SubsetGenerator {
    private static final Logger logger = LoggerFactory.getLogger(TripMasterApplication.class);
    private Integer startingTime;
    private Integer endingTime = 24 * 60;
    private Integer bestDistance = Integer.MAX_VALUE;
    private Integer bestTime = Integer.MAX_VALUE;
    private Integer bestPriority = 0;
    private List<Integer> bestPath = new ArrayList<>();
    private List<CalculatePlaces> places;
    private boolean differentDestination;

    public SubsetGenerator(CalculateRouteRequest request) {
        this.places = request.getPlaces();
        this.startingTime = request.getStartingTime();
        if(request.getEndingTime() != null)
            this.endingTime = request.getEndingTime();
        this.differentDestination = request.getDifferentDestination();
    }

    public List<Integer> generateAllSubsetsWithZero() {
        List<Integer> currentSubset = new ArrayList<>();

        int start = 1;
        int end = places.size() - 1;

        if(differentDestination)
            end--;

        // Generate subsets
        for (int size = 1; size <= end; size++) {
            generateSubsets(start, end, size, currentSubset);
        }

        List<Integer> tempPath = new ArrayList<>(bestPath);
        bestPath.clear();
        bestPath.add(0);
        bestPath.addAll(tempPath);
        if(differentDestination)
            bestPath.add(-1);
        else
            bestPath.add(0);
        return bestPath;
    }

    private void generateSubsets(int start, int end, int size, List<Integer> currentSubset) {
        if (currentSubset.size() == size) {
            findPermutations(currentSubset);

            return;
        }

        for (int i = start; i <= end; i++) {
            currentSubset.add(i);
            generateSubsets(i + 1, end, size, currentSubset);
            currentSubset.remove(currentSubset.size() - 1);
        }
    }

    private void findPermutations(List<Integer> subset) {
        findPermutationsHelper(subset, 0);
    }

    private void findPermutationsHelper(List<Integer> subset, int index) {
        if (index == subset.size() - 1) {
            calculateRouteScore(subset);
            return;
        }

        for (int i = index; i < subset.size(); i++) {
            swap(subset, index, i);
            if(!(differentDestination && index == subset.size() - 1))
                findPermutationsHelper(subset, index + 1);
            swap(subset, index, i);
        }
    }

    private void swap(List<Integer> list, int i, int j) {
        int temp = list.get(i);
        list.set(i, list.get(j));
        list.set(j, temp);
    }

    private void calculateRouteScore(List<Integer> route) {
        boolean isPlaceClosed = false;
        Integer totalTime = startingTime + places.get(0).getDistances().get(route.get(0)).getDuration()
                + places.get(route.get(0)).getDuration();
        Integer totalDistance = 0;
        Integer totalPriority = 0;

        // Iterate through all the opening hours periods of the next place to check if it is still open
        // by the time we get there
        for (Period p : places.get(route.get(0)).getOpeningHours()) {

            if (endingTime < totalTime) {
                isPlaceClosed = true;
            }

            // If the place is closed at all periods, and it is not open after midnight, we stop the path
            if (p.getClose() < totalTime && !(p.getClose() < p.getOpen())) {
                isPlaceClosed = true;
            }

            // If the place is open at any period, we continue the path
            else {

                isPlaceClosed = false;

                // Add the priority of the next place to the current priority
                totalPriority += places.get(route.get(0)).getPriority();

                // Add the distance to the next place to the current distance
                totalDistance += places.get(0).getDistances().get(route.get(0)).getDistance();

                // if the place is open after we get there, we set the current time to be the opening time +
                // the staying time
                if (totalTime < p.getOpen()) {
                    totalTime = p.getOpen() + places.get(route.get(0)).getDuration();
                }

                break;
            }
        }

        if (isPlaceClosed) {
            return;
        }

        for (int currentPlace = 0; currentPlace < route.size() - 1; currentPlace++) {
            int nextPlace = route.get(currentPlace + 1);
            // Initialize temporary time to the current time + the time to get to the next place + the duration
            totalTime += places.get(currentPlace).getDistances().get(nextPlace).getDuration()
                    + places.get(nextPlace).getDuration();

            // Iterate through all the opening hours periods of the next place to check if it is still open
            // by the time we get there
            for (Period p : places.get(nextPlace).getOpeningHours()) {

                if (endingTime < totalTime) {
                    return;
                }

                // If the place is closed at all periods, and it is not open after midnight, we stop the path
                if (p.getClose() < totalTime && !(p.getClose() < p.getOpen())) {
                    isPlaceClosed = true;
                }

                // If the place is open at any period, we continue the path
                else {

                    isPlaceClosed = false;

                    // Add the priority of the next place to the current priority
                    totalPriority += places.get(nextPlace).getPriority();

                    // Add the distance to the next place to the current distance
                    totalDistance += places.get(currentPlace).getDistances().get(nextPlace).getDistance();

                    // if the place is open after we get there, we set the current time to be the opening time +
                    // the staying time
                    if (totalTime < p.getOpen()) {
                        totalTime = p.getOpen() + places.get(nextPlace).getDuration();
                    }

                    break;
                }
            }
            if (isPlaceClosed) {
                return;
            }
        }

        if (differentDestination) {
            totalTime += places.get(route.get(route.size() - 1)).getDistances().get(places.size() - 1).getDuration();
            totalDistance += places.get(route.get(route.size() - 1)).getDistances().get(places.size() - 1).getDistance();
        }

        else {
            totalTime += places.get(route.get(route.size() - 1)).getDistances().get(0).getDuration();
            totalDistance += places.get(route.get(route.size() - 1)).getDistances().get(0).getDistance();
        }
        boolean isBest = false;

        // If the current path is better than the best path so far set it as the best path
        if (totalPriority > bestPriority) {
            isBest = true;
        }

        // If the current path has the same priority as the best path so far
        else if (bestPriority.equals(totalPriority)){
            logger.info("Total priority: " + totalPriority);
            logger.info("Total Time: " + totalTime);
            logger.info("Best Time: " + bestTime);

            // If the current path visits more places than the best path so far, set it as the best path
            if (route.size() > bestPath.size()) {
                isBest = true;
            }

            // If the current path visits the same number of places as the best path so far but is shorter, set it
            else if (route.size() == bestPath.size() && totalTime < bestTime) {
                isBest = true;
            }

            // If the current path visits the same number of places as the best path so far, and lasts the same
            // time, but is shorter, set it as the best path
            else if (route.size() == bestPath.size() && totalDistance == bestDistance && totalTime < bestTime) {
                isBest = true;
            }
        }

        if(isBest) {
            bestDistance = totalDistance;
            bestTime = totalTime;
            bestPriority = totalPriority;
            bestPath = new ArrayList<>(route);
            logger.info("New best path found: " + bestPath);
            logger.info("Best distance: " + bestDistance);
            logger.info("Best time: " + bestTime);
            logger.info("Best priority: " + bestPriority);
        }
    }

    public Integer getBestDistance() {
        return bestDistance / 1000;
    }

    public Integer getBestTime() {
        return bestTime;
    }
}
