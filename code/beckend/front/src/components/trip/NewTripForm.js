import React, {useState} from 'react';
import {City, Country} from 'country-state-city';
import {InputText} from 'primereact/inputtext';
import {Controller, useForm} from 'react-hook-form';
import ReactCountryFlag from "react-country-flag";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button"
import {classNames} from 'primereact/utils';
import {Dialog} from 'primereact/dialog';
import {AutoComplete} from "primereact/autocomplete";
import {fetchAiOverview} from "../place-details/placeDetailsUtils";
import {Divider} from "primereact/divider";

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
            timeOffset: country.gmtOffset / 60,
            starting_date: e.starting_date.toDateString(),
            ending_date: e.ending_date.toDateString(),
            coords: {lat: country.latitude, lng: country.longitude}
        }
        if(e?.city){
            newTrip.city = city.name;
            newTrip.coords = {lat:city.latitude,
                lng: city.longitude}
        }

        newTrip.overview = await fetchAiOverview(newTrip, false);
        await props.handleSubmit(newTrip);
        form.reset();
        setVisible(false)
    }

    return (
        <>
            <Button label="New" icon="pi pi-plus" className="mr-2" onClick={() => setVisible(true)} aria-controls={visible ? 'dlg' : null} aria-expanded={visible} />
            <Dialog
                header="Create new trip"
                headerClassName={'text-center'}
                visible={visible}
                pt={{
                    root: { className: 'w-12 sm:w-9 md:w-6 h-auto' }
                }}
                resizable={false}
                onHide={() => setVisible(false)
                }>
                <Divider className="mt-1 mb-5"/>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-fluid">
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
                    {getFormErrorMessage('tripName')}
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


                    {getFormErrorMessage('country')}
                    {cities.length > 0 &&
                        <>
                            <Controller
                                name="city"
                                control={form.control}
                                render={({  field, fieldState }) => (
                                    <AutoComplete
                                        inputId={field.name}
                                        value={field.value}
                                        itemTemplate={cityOptionTemplate}
                                        inputRef={field.ref}
                                        placeholder="Select a City"
                                        className={classNames({ 'p-invalid': fieldState.error })}
                                        onChange={field.onChange}
                                        onSelect={(e)=>{field.onChange(e.value.name)}}
                                        suggestions={filteredCities}
                                        completeMethod={(e)=>search(e, cities, setFilteredCities)}
                                    />)}
                            />
                            {getFormErrorMessage("city")}
                        </>}
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
                                    form.setValue('ending_date', returnMinDate)
                                }}
                                dateFormat="dd/mm/yy"
                                minDate={new Date()}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                showButtonBar
                                placeholder="Start date"
                                readOnlyInput
                                showIcon
                            />)}
                    />
                    {getFormErrorMessage('starting_date')}

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
                                placeholder="Return date"
                                showButtonBar
                                readOnlyInput
                                showIcon
                            />
                        )}
                    />
                    {getFormErrorMessage('ending_date')}
                    <div className="d-flex gap-2">
                        <Button label="Reset" severity="info" outlined  type="reset" onClick={form.reset} icon="pi pi-delete-left" />
                        <Button label="Submit" type="submit" icon="pi pi-check" />
                    </div>
                </form>
            </Dialog>
        </>
    );
}

export default NewTripForm;