import { useState } from "react";
import data from "./data";
import "./style.css";

const App = () => {
  const [birthdays, setBirthdays] = useState(data);

  const clearAll = () => {
    setBirthdays([]);
  };

  return (
    <main className="container">
      <div className="section">
        <h1>{birthdays.length} Birthdays Today</h1>
        {
          birthdays.map((birthday) => {
            return <Birthday key={birthday.id} {...birthday} />;
          })
        }

        <button onClick={() => { clearAll(); }}>clear all</button>
      </div>
    </main>
  );
};

function Birthday(props) {
  const { name, age, image } = props;

  return (
    <div className='person'>
      <img src={image} alt={image} />
      <div className="desc">
        <h2 className='name'>{name}</h2>
        <h4 className='age'>{age} years</h4>
      </div>
    </div>
  );
}

export default App
