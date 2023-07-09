import React, {useRef, useState} from 'react';
import {Button} from "primereact/button";
import NearBySearch from "./NearBySearch";
import {Divider} from "primereact/divider";
import {Sidebar} from "primereact/sidebar";
import NearbySearchResults from "./NearbySearchResults";

const NearBySearchContainer = ({lat,lng ,map, setCenter, viewDetails}) => {
    const [visible,setVisible] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [places, setPlaces] = useState([]);
    const loadMorePlaces = useRef(null);

    return (
        <div className="bg-transparent  p-3">
            <Button icon="pi pi-align-justify" text onClick={() => setVisible(true)}/>
            <Sidebar visible={visible} className="hide-overflow" dismissable={false}  modal={false} appendTo={map.getDiv()} onHide={() => setVisible(false)}>
                <NearBySearch map={map} geocode={{lat,lng}} setCenter={setCenter} viewDetails={viewDetails} setPlaces={setPlaces} setNextPage={setPagination} />
                <Divider />
                <NearbySearchResults places={places} />
                <Button ref={loadMorePlaces} onClick={pagination?.nextPage} disabled={!pagination || !pagination?.hasNextPage} >Next</Button>
            </Sidebar>
        </div>
    );
};

export default NearBySearchContainer;