import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import CategoriesInput from "./CatagoriesInput";
import RadiusInput from "./RadiusInput";
import PriceRangeInput from "./PriceRangeInput";
import {Button} from "primereact/button";
import {googleCategories, nearbySearch as gSearch} from "./googleUtils"
import {foursquareCategories, nearBySearch as fs}  from "./foursquareUtils";
import {SelectButton} from "primereact/selectbutton";
import useFourSquare from "../../core/hooks/useFourSquare";

const NearBySearch = ({dayPlaces, map, geocode, viewDetails, setPlaces, setNextPage}) => {
    const {axiosFourSquare} = useFourSquare();
    const googleSearch = async (formValues, dayPlaces) => {return await gSearch(dayPlaces, map, formValues, viewDetails, setPlaces, setNextPage)};
    const fsSearch = async(formValues, dayPlaces)=> {return await fs(axiosFourSquare, dayPlaces, formValues, viewDetails, setPlaces, setNextPage)};
    const searchEngines = {
        Google: {
            search: googleSearch,
            categories: {
                options: googleCategories,
                multiple: false
            },
            initialState: {
                query: "",
                radius: 0.5,
                price: null,
                categories: []
            }
        },
        FourSquare: {
            search: fsSearch,
            categories: {
                options: foursquareCategories,
                multiple: true
            },
            initialState: {
                query: "",
                radius: 0.5,
                price: null,
                categories: [],
            }
        }
    }

    const [formValues, setFormValues] = useState(searchEngines.Google.initialState);
    const [engine, setEngine] = useState("Google");

    const onChangeEngine = (e) => {
        setEngine(e);
        setFormValues(searchEngines[e].initialState);
    }

    const onValueChange = (event) => {
        const { name, value } = event;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const formSubmit = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const newFormValues = {...formValues, lat: geocode.lat, lng: geocode.lng}

        const places = await searchEngines[engine].search(newFormValues, dayPlaces);
        console.log(places);
    }

    return (
        <>
            <SelectButton value={engine} onChange={(e) => onChangeEngine(e.value)} options={["Google","FourSquare"]} />
            <form onSubmit={formSubmit} className="flex flex-column gap-2">
                <InputText
                    id="query"
                    placeholder="text search (optional)"
                    name="query"
                    value={formValues.query}
                    onChange={(e) => onValueChange(e.target)}
                />
                <CategoriesInput
                    list={searchEngines[engine].categories.options}
                    multiple={searchEngines[engine].categories.multiple}
                    selectedCategories={formValues.categories}
                    setSelectedCategories={(e) => onValueChange(e.target)}
                />
                <PriceRangeInput
                    price={formValues.price}
                    setPrice={(e) => onValueChange(e.target)}
                />
                <RadiusInput
                    radius={formValues.radius}
                    setRadius={onValueChange}
                />
                <Button
                    type="submit"
                    label="Search"
                    className="p-button-raised p-button-rounded"
                />
            </form>
        </>
    );
};

export default NearBySearch;