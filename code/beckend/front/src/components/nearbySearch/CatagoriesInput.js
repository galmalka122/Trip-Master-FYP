import React from 'react';
import {MultiSelect} from "primereact/multiselect";
const CategoriesInput = ({list, multiple, selectedCategories, setSelectedCategories}) => {

    const placeHolderText = multiple ? `Categories (Max 3 - Optional)` : `Category (Optional)`;

    return <div className={"flex flex-column gap-2"}>
        <MultiSelect
            value={selectedCategories}
            name={"categories"}
            onChange={setSelectedCategories}
            options={list}
            optionLabel="name"
            optionValue="id"
            filter
            display="chip"
            showClear={true}
            showSelectAll={false}
            selectionLimit={multiple ? 3 : 1}
            placeholder={placeHolderText}
            maxSelectedLabels={3}
            appendTo="self"
            panelClassName="w-25"
        />
    </div>
};

export default CategoriesInput;