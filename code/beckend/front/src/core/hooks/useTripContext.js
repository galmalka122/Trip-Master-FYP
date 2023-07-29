import { useContext } from 'react';
import { TripContext } from '../context/TripContext';

const useTripContext = () => useContext(TripContext);

export default useTripContext;