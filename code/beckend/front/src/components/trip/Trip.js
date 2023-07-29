// noinspection JSUnresolvedVariable

import React, {useEffect, useState} from 'react';
import { Col,Table,  Row} from "react-bootstrap";
import TripImage from "./TripImage";
import useTripContext from "../../core/hooks/useTripContext";
import { Panel } from 'primereact/panel';
import DaysContainer from "./DaysContainer";
import {calculateRemainingDays, fetchWeather} from "./utils";

/**
 * @returns {JSX.Element} - A component that displays the trip details and the weather forecast for each day of the trip.
 */
const Trip = () => {
    const { selectedTrip } = useTripContext();
    console.log(selectedTrip);
    const [days, setDays] = useState(JSON.parse(localStorage.getItem(`${selectedTrip.trip_id}-weather`)) || []);
    const { trip_id,country, city, starting_date, ending_date, coords, overview } = selectedTrip;
    const str = city ? `${city}, ${country}` : `${country}`
    useEffect(()=> {
        const getWeather = async () => {
            const res = await fetchWeather( coords.lat, coords.lng, starting_date, ending_date);
            const newDays = res?.days.map((el, index)=>{

                const curDate = new Date(el.datetime);
                return {
                    ...el,
                    day: curDate.getDay(),
                    datetime: curDate.toLocaleDateString(),
                    icon: `/assets/icons/weather/${el.icon}.PNG`,
                    index: index,
                }
            })
            localStorage.setItem(`${selectedTrip.trip_id}-weather`, JSON.stringify(newDays))
            setDays(newDays)

        }
        days.length > 0 || getWeather();
        // eslint-disable-next-line
    },[days])

    return (
        <main>
        <Panel header={`Your trip to ${str}`} pt={{
            header: { className: 'justify-content-center bg-primary h3' },
        }}>
            <Row>
                <Col >
                    <TripImage tripId={trip_id} country={country} city={city} latitude={coords.lat} longitude={coords.lng}/>
                </Col>
                <Col>
                    <Row>
                    <Table borderless className="text-xl">
                        <tbody>
                        <tr>
                            <td>
                                <strong>Country:</strong>
                            </td>
                            <td>
                                {country}
                            </td>
                        </tr>
                        {city && (<tr>
                            <td>
                                <strong>City:</strong>
                            </td>
                            <td>
                                {city}
                            </td>
                        </tr>)}
                        <tr>
                            <td>
                                <strong>Dates:</strong>
                            </td>
                            <td>
                                {`${starting_date} - ${ending_date}`}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    </Row>
                    <Row>
                        <p className="text-center m-0 h4">
                        {`${calculateRemainingDays(starting_date,ending_date)} days left`}
                        </p>
                    </Row>
                    <Row>
                        {overview && <p className="mt-4 text-xl">
                            {overview}
                        </p>}
                    </Row>
                </Col>
            </Row>
            {days.length > 0 &&(<DaysContainer tripDays={days} lat={coords.lat} lng={coords.lng}/>)}
        </Panel>
        </main>
    );
};

export default Trip;