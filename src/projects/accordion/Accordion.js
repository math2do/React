import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import questions from "./data";
import "./styles.css";

const Accordion = () => {
  return (
    <div className="container">
      <h1>Questions</h1>
      <div className="questions">
        {
          questions.map((question) => {
            return <Question key={question.id} {...question} />;
          })
        }
      </div>
    </div>
  );
};

function Question({ title, info }) {

  const [isExpaned, setIsExpanded] = useState(false);

  return (
    <div className="question">
      <div className="title">
        <h4>{title}</h4>
        {
          isExpaned
            ? <FontAwesomeIcon className='minus' icon={faMinusCircle} onClick={() => { setIsExpanded(false) }} />
            : <FontAwesomeIcon className='plus' icon={faPlusCircle} onClick={() => { setIsExpanded(true) }} />
        }
      </div>

      {isExpaned && <p>{info}</p>}

    </div>
  );
}

export default Accordion;
