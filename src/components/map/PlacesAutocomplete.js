import React, {useEffect, useState} from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {AutoComplete} from "primereact/autocomplete"
import {useForm} from "react-hook-form";

const PlacesAutocomplete = ({ setSelected }) => {
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

    const getItemString = (matched_substrings) => {
        const strings = []
        let index = 0;
        let length
        if(matched_substrings.length === 0) return strings;
        if(matched_substrings[0].offset > 0){
            strings.push(value.slice(0,matched_substrings.offset));
        }
        matched_substrings?.map(match=>{

        })
        strings.push(value.slice(matched_substrings.offset + 1,matched_substrings.length));
        strings.push(value.slice(matched_substrings.offset + 1 + matched_substrings.length,value.length));
        return strings;
    }

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        setShowSuggestions(false);

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setSelected({ lat, lng });
        } catch (error) {
            console.error("Error retrieving geocode:", error);
        }
    };

    const itemTemplate = (item) => {
        console.log(item);
        return (
            <div id={item.place_id} className="pac-item"><span
                className="pac-item-query">{item.structured_formatting.main_text}</span><span>{item.structured_formatting.secondary_text}</span>
            </div>
        );
    };

    const renderSuggestions = () =>
        data?.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    const itemTemplate2 = (item) => {
        const {
            place_id,
            structured_formatting: { main_text, secondary_text, matched_substrings },
        } = item;
        const strings = getItemString(matched_substrings);
        return (
            <div id={place_id} className="pac-item"><span
                className="pac-item-query"><span className="pac-matched">DF</span>O Homebush</span><span>Underwood Road, Homebush NSW, Australia</span>
            </div>
        );
    };

    const handleInputChange = (event) => {
        setValue(event.value);
        setShowSuggestions(true);
    };


    return (
            <AutoComplete
                appendTo={"self"}
                inputId="place"
                value={value}
                disabled={!ready}
                placeholder="Search nearby places"
                onChange={handleInputChange}
                onSelect={handleSelect}
                suggestions={data}
                completeMethod={()=>{return data}}
                itemTemplate={itemTemplate}
                 />
    );
};

export default PlacesAutocomplete;
