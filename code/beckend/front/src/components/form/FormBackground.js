import React from 'react';

function FormBackground({imageUrl}) {
    const styles = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: `center center`
    };

    return (<div id="bg-block" className="col-lg-6 d-flex align-items-end" style={styles}/>);
}

export default FormBackground;