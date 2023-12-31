import React, {useEffect} from 'react';
import {Galleria} from "primereact/galleria";
import axios from "axios";

function PlaceGallery({images, onError}) {
    useEffect(() => {
        checkImages();
    }, [])

    const checkImages = async () => {
        if(!images || images?.length === 0){
            await onError('photos');
        }
        else {
            try{
                await axios.get(images[0].urlLarge);
            }
            catch (e){
                await onError('photos');
            }
        }
    }

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    const thumbnailTemplate = (item) => {
        return <img src={item.urlSmall} alt={item.attrs} style={{ width: '100%',height: '5rem', display: 'block' }} />
    }

    const itemTemplate = (item) => {
        return <img src={item.urlLarge} alt={item.attrs} key={item.attrs} style={{ width: '100%', height: '40vh', display: 'block' }} />;
    }

    return <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={7}
            circular
            autoPlay
            showItemNavigators
            showThumbnailNavigators={false}
            style={{ width: 'auto', height: '60%' }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
             />

}

export default PlaceGallery;