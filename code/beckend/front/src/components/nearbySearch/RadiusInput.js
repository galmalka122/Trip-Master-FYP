import React, {useRef} from 'react';
import {Slider} from "primereact/slider";

const RadiusInput = ({radius, setRadius}) => {
    const ref = useRef(null);

    return (
        <div className="flex flex-column gap-2">
            <label
                className="align-self-center"
                htmlFor="radius">
                Radius: {`${radius} km`}
            </label>
            <Slider
                ref={ref}
                min={0.5}
                max={50}
                step={0.5}
                id="radius"
                name={"radius"}
                value={radius}
                onChange={(e)=> setRadius({name: ref.current.props.name, value: e.value})}
            />
        </div>
    );
};

export default RadiusInput;