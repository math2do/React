import { useEffect, useState } from 'react';
import './style.css';

export default function Tours() {
  const url = 'https://course-api.com/react-tours-project';
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTours = async () => {
    // setTours(data);
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      console.log(tours);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => {
      return tour.id !== id;
    });

    setTours(newTours);
  };

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h1>No Tours Left</h1>
          <button onClick={() => { fetchTours() }}>refresh</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Our Tours</h1>
      <div className="underline"></div>
      <div className="tours">
        {
          tours.map((place) => {
            return <Place key={place.id} {...place} removeTour={removeTour} />;
          })
        }
      </div>
    </main>
  );
}

function Loading() {
  return (
    <h2>Loading...</h2>
  );
}

function Place({ id, name, info, image, price, removeTour }) {
  const [readMore, setReadMore] = useState(true);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  if (readMore) {
    info = info.substring(0, 200);
    console.log(info);
  }
  info = info + "...";

  return (
    <div className="tour">
      <div className="image">
        <img src={image} alt={name} />
        <p className='price'>$ {price}</p>
      </div>
      <h2 className='name'>{name}</h2>
      <p className='info'>{info}
        {
          readMore ?
            <span className='more_less'
              onClick={() => { toggleReadMore(); }}>Read More</span>

            : <span className='more_less'
              onClick={() => { toggleReadMore(); }}>Show Less</span>
        }
      </p>

      <div className='remove'>
        <button className='remove-btn' onClick={() => { removeTour(id); }}>not interested</button>
      </div>

    </div>
  );
}
