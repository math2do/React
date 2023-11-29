import "./styles.css"
import questions from "./data"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const Accordion = () => {
  return (
    <div className="container">
      <h1>Questions</h1>
      <div className="questions">
        {
          questions.map((question) => {
            return <Question key={question.id} {...question} />
          })
        }
      </div>
    </div>
  );
}

function Question({ id, title, info }) {

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