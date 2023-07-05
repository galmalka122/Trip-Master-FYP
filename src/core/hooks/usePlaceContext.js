import { useContext } from 'react';
import { PlaceContext } from '../context/PlaceContext';

const usePlaceContext = () => useContext(PlaceContext);

export default usePlaceContext;