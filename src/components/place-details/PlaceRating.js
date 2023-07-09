import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {Box} from "@mui/material";

const labels = {
    null: 'No Rating',
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const PlaceRating = ({rating}) => {
    const roundRating = (Math.round(rating * 2) / 2).toFixed(1)
    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'center',
            }}
        >
            <Rating
                name="text-feedback"
                value={rating}
                readOnly
                precision={0.1}
                emptyIcon={<StarIcon  fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{labels[roundRating]}</Box>
        </Box>
    );
};

export default PlaceRating;