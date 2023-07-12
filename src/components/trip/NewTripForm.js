import React, { useState} from 'react';
import { Country, City } from 'country-state-city';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import ReactCountryFlag from "react-country-flag";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button"
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import {AutoComplete} from "primereact/autocomplete";
import {fetchAiOverview} from "../place-details/placeDetailsUtils";

function NewTripForm(props) {
    const countries = Country.getAllCountries();
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState(null);
    const defaultValues = { tripName: "", country: null, city: null, dates: null };
    const form = useForm({ defaultValues });
    const [minDate, setMinDate] = useState(new Date());
    const errors = form.formState.errors;
    const [visible, setVisible] = useState(false);
    const search = (event, data, setData) => {

            let _filteredEntries;

            if (!event.query.trim().length) {
                _filteredEntries = [...data];
            }
            else {
                _filteredEntries = data.filter((entry) => {
                    return entry.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setData(_filteredEntries);
    }


    const getFormErrorMessage = (name) => {
        return errors[name] ? <div><small className="p-error">{errors[name].message}</small></div> : <div><small className="p-error">&nbsp;</small></div>;
    };

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                    <span id={option.name}>{option.name}</span>
            )
        }
        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2" id={option.name}>
                <ReactCountryFlag countryCode={option.isoCode} svg style={{
                    width: '18px',
                }}/>
                <span id={option.name}>{option.name}</span>
            </div>
        );
    };


    const cityOptionTemplate = (option) => {
        return (
                <div id={option.name}>{option.name}</div>
        );
    };

    const onCountryChange = (e, field) => {
        field.onChange(e.value.name)
        setCities(City.getCitiesOfCountry(e.value.isoCode));
    }

    const onSubmit = async (e) => {
        const country = filteredCountries.filter(country=>country.name === e.country)[0];
        const city = cities.filter(city=>city.name === e.city)[0];
        let newTrip = {
            name: e.tripName,
            country: country.name,
            code: country.isoCode,
            starting_date: e.starting_date.toDateString(),
            ending_date: e.ending_date.toDateString(),
        }
        if(e?.city){
            newTrip = {
                ...newTrip,
                city: city.name,
                latitude: city.latitude,
                longitude: city.longitude
            }
        }
        else{
            newTrip = {
                ...newTrip,
                latitude: country.latitude,
                longitude: country.longitude
            }
        }
        const overview = await fetchAiOverview(newTrip,false);
        newTrip.overview = overview;
        await props.handleSubmit(newTrip);
        form.reset()
        setVisible(false)
    }

    return (
        <>
            <Button label="New" icon="pi pi-plus" className="mr-2" onClick={() => setVisible(true)} aria-controls={visible ? 'dlg' : null} aria-expanded={visible ? true : false} />
            <Dialog
                header="Create new trip"
                visible={visible}
                pt={{
                    root: { className: 'w-12 sm:w-9 md:w-6 h-auto' }
                }}
                resizable={false}
                onHide={() => setVisible(false)
                }>

                <form onSubmit={form.handleSubmit(onSubmit)} className="p-fluid">
                    <span className="p-float-label">
                        <Controller
                            name="tripName"
                            control={form.control}
                            rules={{ required: 'Name is required.' }}
                            render={({ field, fieldState }) => (
                                <InputText
                                    onChange={field.onChange}
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    value={field.value}
                                    placeholder="Name"
                                    keyfilter="alphanum" />)}
                        />
                        <label className={classNames({ 'p-error': errors.value })} htmlFor="tripName"></label>
                    </span>
                    {getFormErrorMessage('tripName')}

                    <span className="p-float-label" style={{width:'100%'}}>
                        <Controller
                            name="country"
                            control={form.control}
                            rules={{ required: 'Country is required.' }}
                            render={({  field, fieldState }) => (
                                <AutoComplete
                                    placeholder="Select a Country"
                                    inputId={field.name}
                                    value={field.value}
                                    virtualScrollerOptions={{ itemSize: 38 }}
                                    itemTemplate={countryOptionTemplate}
                                    inputRef={field.ref}
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    onChange={field.onChange}
                                    onSelect={(e)=>onCountryChange(e,field)}
                                    suggestions={filteredCountries}
                                    selectedItemTemplate={selectedCountryTemplate}
                                    completeMethod={(e)=>search(e, countries, setFilteredCountries)}
                                />)}
                        />
                        <label className={classNames({ 'p-error': errors.value })} htmlFor="country"></label>
                    </span>

                    {getFormErrorMessage('country')}
                    {cities.length > 0 &&
                        <>
                        <span className="p-float-label">
                            <Controller
                                name="city"
                                control={form.control}
                                render={({  field, fieldState }) => (
                                    <AutoComplete
                                        inputId={field.name}
                                        value={field.value}
                                        itemTemplate={cityOptionTemplate}
                                        inputRef={field.ref}
                                        className={classNames({ 'p-invalid': fieldState.error })}
                                        onChange={field.onChange}
                                        onSelect={(e)=>{field.onChange(e.value.name)}}
                                        suggestions={filteredCities}
                                        completeMethod={(e)=>search(e, cities, setFilteredCities)}
                                    />)}
                            />
                        </span>
                            <label className={classNames({ 'p-error': errors.value })} htmlFor="city">Select a City</label>
                            {getFormErrorMessage("city")}
                        </>}
                    <span className="p-float-label field">
                    <Controller
                        name="starting_date"
                        control={form.control}
                        rules={{ required: 'Dates are required.' }}
                        render={({ field, fieldState }) => (
                            <Calendar
                                inputId={field.name}
                                value={field.value}
                                onChange={(e)=>{
                                    field.onChange(e);
                                    const returnMinDate = new Date(e.target.value);
                                    returnMinDate.setDate(returnMinDate.getDate() + 1);
                                    setMinDate(returnMinDate);
                                }}
                                dateFormat="dd/mm/yy"
                                minDate={new Date()}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                showButtonBar
                                readOnlyInput
                                showIcon
                            />)}
                    />
                </span>
                    <label className={classNames({ 'p-error': errors.value })} htmlFor="starting_date">Start date</label>
                    {getFormErrorMessage('starting_date')}
                    <span className="p-float-label">
                <Controller
                    name="ending_date"
                    control={form.control}
                    rules={{ required: 'Dates are required.' }}
                    render={({ field, fieldState }) => (
                        <Calendar
                            inputId={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            dateFormat="dd/mm/yy"
                            minDate={minDate}
                            className={classNames({ 'p-invalid': fieldState.error })}
                            showButtonBar
                            readOnlyInput
                            showIcon
                        />
                    )}
                />
                    </span>
                    <label className={classNames({ 'p-error': errors.value })} htmlFor="ending_date">Return date</label>
                    {getFormErrorMessage('ending_date')}
                    <Button label="Reset" severity="info" outlined  type="reset" onClick={form.reset} icon="pi pi-delete-left" />
                    <Button label="Submit" type="submit" icon="pi pi-check" />
                </form>
            </Dialog>
        </>
    );
}

export default NewTripForm;