import React from 'react';
import {SelectButton} from "primereact/selectbutton";

const PriceRangeInput = ({price, setPrice}) => {

    const priceOptions = [
        { name: "$", value: 1, explanation: "Affordable" },
        { name: "$$", value: 2, explanation: "Moderate" },
        { name: "$$$", value: 3, explanation: "Expensive" },
        { name: "$$$$", value: 4, explanation: "Luxury" }
    ];

    const priceText = price === null ? "Free" : priceOptions[price - 1].explanation;

    return (
        <div className="flex flex-column price">
            <label htmlFor="price" className="align-self-center">Price: {priceText}</label>
            <SelectButton
                value={price}
                onChange={setPrice}
                optionLabel="name"
                name={"price"}
                id={"price"}
                className={"align-self-center pt-0"}
                options={priceOptions}
            />
        </div>
    );
};

export default PriceRangeInput;