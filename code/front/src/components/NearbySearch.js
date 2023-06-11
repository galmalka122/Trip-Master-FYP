import React, {useRef, useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from "primereact/inputtext";
import {Slider} from "primereact/slider";
import {Dropdown} from "primereact/dropdown";
import {placeTypes} from "./map/placeDetailsUtils";
const NearbySearch = ({onSubmit}) => {
    const defaultValues = {text:""}
    const [price, setPrice] = useState([20,80]);
    const [type, setType] = useState(null);
    const [radius, setRadius] = useState(0);
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({defaultValues});

    const formSubmit = async (e)=>{
        let search = {};
        if(e?.text) search.keyword = e.text;
        search.minPriceLevel = price[0] / 20;
        search.maxPriceLevel = price[1] / 20;
        if(type) search.type = placeTypes[type];
        search.radius = (radius / 2) + 2;
        console.log("search");
        await onSubmit(search)

    }
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const placeTypeArray = Object.keys(placeTypes);
    return (
        <div className="card flex justify-content-center gap-2">
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-column gap-2">
                <Controller
                    name="text"
                    control={control}
                    rules={{required: 'Please enter a text'}}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <label htmlFor={field.name}>Text (optional)</label>
                                {getFormErrorMessage('text')}
                            </span>
                        </>
                    )}
                />

            <Dropdown
                id="type"
                value={type}
                placeholder="Select a Type (optional)"
                options={placeTypeArray}
                itemTemplate={(type)=>{
                    return (<div>
                        {type}
                    </div>)}}
                onChange={(e)=>setType(e.target.value)}
            />
            <div className="flex flex-wrap justify-content-around m-3">

                <div className="align-items-center">
                    <label htmlFor="price">Price range</label>
                    <Slider
                        id="price"
                        step={20}
                        value={price}
                        onChange={(e) => setPrice(e.value)}
                        className="w-14rem"
                        range
                    />
                </div>
                <div className="align-items-center">
                    <label htmlFor="radius">Radius: {`${(radius / 2) + 2} km`}</label>
                    <Slider
                        step={2}
                        id="radius"
                        value={radius}
                        onChange={(e) => setRadius(e.value)}
                        className="w-14rem"
                    />
                </div>
            </div>
            <Button label="Search" type="submit" icon="pi pi-check" />
            </form>
        </div>
    )
}

export default NearbySearch;
