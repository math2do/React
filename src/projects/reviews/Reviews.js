import { faArrowLeft, faArrowRight, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import data from "./data";
import "./style.css";

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const next = () => {
    let nextIndex = index + 1;
    if (nextIndex === data.length) {
      nextIndex = 0;
    }
    setIndex(nextIndex);
  };

  const prev = () => {
    let prevIndex = index - 1;
    if (prevIndex === -1) {
      prevIndex = data.length - 1;
    }
    setIndex(prevIndex);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const surprise = () => {
    const newIndex = getRandomInt(data.length);
    setIndex(newIndex);
  };

  return (
    <main className="container">
      <Review {...data[index]}
        surprise={surprise} prev={prev} next={next} />
    </main>
  );
};

function Review({ name, job, image, text, surprise, prev, next }) {
  return (
    <div className="review">
      <div className="image">
        <img src={image} alt={name} />
        <div className="quote">
          <FontAwesomeIcon icon={faQuoteRight} />
        </div>

      </div>
      <h1>{name}</h1>
      <h4>{job}</h4>
      <p>{text}</p>

      <div className="arrows">

        <FontAwesomeIcon className='arrow_left' icon={faArrowLeft} onClick={() => { prev() }} />
        <FontAwesomeIcon className='arrow_right' icon={faArrowRight} onClick={() => { next() }} />

      </div>

      <button onClick={() => { surprise(); }}>Surprise Me</button>
    </div>
  );
}

export default Reviews;
