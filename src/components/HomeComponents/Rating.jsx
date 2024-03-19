
import { useState } from "react";
import { FaStar } from "react-icons/fa";
const Rating = () => {
    const noOfStars=5
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    function handleClick(getCurrentId) {
      setRating(getCurrentId);
      console.log(getCurrentId);
    }
    function handleMouseEnter(getCurrentId) {
      setHover(getCurrentId);
    }
    function handleMouseLeave() {
      setHover(rating);
    }
    
  return (
    
    <div className="flex">
    {[...Array(noOfStars)].map((_, index) => {
      index += 1;
      return (
        <FaStar
          key={index}
          className={index <= (hover || rating) ? "text-yellow-400" : "text-black"}
          onClick={() => handleClick(index)}
          onMouseMove={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          size={50}
        ></FaStar>
      );
    })}
  </div>

  )
}

export default Rating
