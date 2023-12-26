import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import data from "./data";
import "./style.css";

const works = data.map((work, index) => {
  return {
    company: work.company,
    index: index
  };
});

const Tab = () => {
  const [work, setWork] = useState(works[0]);
  const currentWork = data[work.index];

  return (
    <div className="container">
      <ul className="companies">
        {
          works.map((workItem) => {
            return <li
              key={workItem.index}
              className={`${workItem.index === work.index && 'active'}`}
              onClick={() => { setWork(workItem); }}>
              {workItem.company}
            </li>;
          })
        }
      </ul>

      <div className="desc">
        <h1>{currentWork.title}</h1>
        <p className='company_name'>{currentWork.company}</p>
        <p className='dates'>{currentWork.dates}</p>
        <div className="duties">
          {
            currentWork.duties.map((duty, index) => {
              return <div
                className="duty" key={index}>
                <FontAwesomeIcon icon={faAngleDoubleRight} className='arrow' />
                <p>{duty}</p>
              </div>;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Tab;
