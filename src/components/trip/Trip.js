import React, {useEffect, useState} from 'react';
import { Col,Table,  Row} from "react-bootstrap";
import TripImage from "./TripImage";
import useTripContext from "../../core/hooks/useTripContext";
import { Panel } from 'primereact/panel';
import DaysContainer from "./DaysContainer";
import {calculateRemainingDays, fetchWeather} from "./utils";

const Trip = () => {
    const { selectedTrip } = useTripContext();
    console.log(selectedTrip);
    const [days, setDays] = useState(JSON.parse(localStorage.getItem(`${selectedTrip.trip_id}-weather`)) || []);
    const { trip_id,country, city, starting_date, ending_date, latitude, longitude, overview } = selectedTrip;
    const str = city ? `${city}, ${country}` : `${country}`
    useEffect(()=> {
        const weather = async () => {
            const res = await fetchWeather( latitude, longitude, starting_date, ending_date);
            const newDays = res?.days.map((el, index)=>{
                const curDate = new Date(el.datetime);
                return {
                    ...el,
                    day: curDate.getDay(),
                    datetime: curDate.toLocaleDateString(),
                    icon: `/assets/img/weather/${el.icon}.PNG`,
                    index: index,
                }
            })
            localStorage.setItem(`${selectedTrip.trip_id}-weather`, JSON.stringify(newDays))
            setDays(newDays)

        }
        days.length > 0 || weather();
        // eslint-disable-next-line
    },[days])

    const onDayClick = () => {

    }

    return (
        <main>
        <Panel header={`Your trip to ${str}`} pt={{
            header: { className: 'justify-content-center bg-primary' },
        }}>
            <Row>
                <Col >
                    <TripImage tripId={trip_id} country={country} city={city} latitude={latitude} longitude={longitude}/>
                </Col>
                <Col>
                    <Row>
                    <Table borderless>
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
                        <p className="m-0">
                        {`${calculateRemainingDays(starting_date,ending_date)} days left`}
                        </p>
                    </Row>
                    <Row>
                        {overview && <p className="m-0">
                            {overview}
                        </p>}
                    </Row>
                </Col>
            </Row>
            {days.length > 0 &&(<DaysContainer tripDays={days} lat={latitude} lng={longitude}/>)}
        </Panel>
        </main>
    );
};

export default Trip;