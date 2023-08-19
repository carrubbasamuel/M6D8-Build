import React from 'react';

import { RatingComponent } from 'react-rating-emoji';
import 'react-rating-emoji/dist/index.css';
import { useDispatch } from 'react-redux';
import { setRating } from '../../../../redux/reducers/ReviewSlice';


const Rate = ({rate, rating}) => {
  const dispatch = useDispatch();
  const handleRating = (newRating) => {
    dispatch(setRating(newRating));
  }

  return <RatingComponent className={rate? "myclass": ""} rating={rate || rating} onClick={handleRating} />
}

export default Rate