import React from "react";
import {FaStar} from "react-icons/fa";

const createArray = length => [...Array(length)];

export default function StarRating({ totalStars = 5, selectedStars}){
    //const [selectedStars] = useState(3);
    //return[
        //createArray(totalStars).map((n, i) => <Star key={i}/>)
    //]
    return(
        <>
          {createArray(totalStars).map((n, i) => (
            <Star
              key={i}
              selected={selectedStars > i}
            />
          ))}
        </>
      )    
}

const Star = ({ selected }) => (
    <FaStar color={selected ? "red" : "grey"} />
  );