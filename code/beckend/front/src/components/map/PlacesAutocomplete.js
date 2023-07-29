import React, {useEffect, useState} from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {AutoComplete} from "primereact/autocomplete"
import {useForm} from "react-hook-form";
import {allGoogleFields, fetchDetails} from "../nearbySearch/googleUtils";

const PlacesAutocomplete = ({ setSelected, ref="self", disabled, placeholder="Search nearby places" }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({cache: 24 * 60 * 60,
    });
    const form = useForm({ value });
    const errors = form.formState.errors;
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSelect = async (address) => {
        let fields = allGoogleFields;
        setValue(address.value.description, false);
        clearSuggestions();
        setShowSuggestions(false);

        try {
            await fetchDetails({place_id: address.value.place_id}, fields, setSelected);
        } catch (error) {
            console.error("Error retrieving geocode:", error);
        }
    };

    const itemTemplate = (item) => {
        return (
            <div id={item.place_id} className="pac-item"><span
                className="pac-item-query">{item.structured_formatting.main_text}</span><span>{item.structured_formatting.secondary_text}</span>
            </div>
        );
    };

    const handleInputChange = (event) => {
        setValue(event.value);
        setShowSuggestions(true);
    };


    return (
            <AutoComplete
                appendTo={ref}
                inputId="place"
                value={value}
                disabled={disabled || !ready}
                placeholder={placeholder}
                onChange={handleInputChange}
                onSelect={handleSelect}
                suggestions={data}
                completeMethod={()=>{return data}}
                itemTemplate={itemTemplate}
                 />
    );
};

export default PlacesAutocomplete;
