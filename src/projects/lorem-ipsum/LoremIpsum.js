import "./style.css";
import data from "./data"
import { useState } from 'react';

const LoremIpsum = () => {
  const [upto, setUpto] = useState(1);
  const [paragraphs, setParagraphs] = useState(data.slice(0, 1));

  const handleGenerate = (e) => {
    e.preventDefault();
    setParagraphs(data.slice(0, upto));
  };

  const handleOnChange = (value) => {
    let counter = parseInt(value);
    if (counter >= 1 && counter <= 8) {
      setUpto(counter);
      return;
    }
  };

  return (
    <div className="container">

      <h2 className='title underline'>Tired of boring lorem ipsum?</h2>

      <form className="form" onSubmit={handleGenerate}>
        <label htmlFor="paragraph">Paragraphs:</label>
        <input type="number" name='paragraph'
          value={upto}
          onChange={(e) => { handleOnChange(e.target.value); }}
        />
        <button type='submit'>Generate</button>
      </form >
      {
        paragraphs.map((parag, idx) => {
          return <p className='paragraph' key={idx}>{parag}</p>;
        })
      }
    </div >
  );
};

export default LoremIpsum;
