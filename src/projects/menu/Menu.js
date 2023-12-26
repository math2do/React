import { useState } from 'react';
import data from "./data";
import "./style.css";
const categories = ['all', ...new Set(data.map((item) => item.category))];

const Menu = () => {
  const [items, setItems] = useState(data);

  const filterCategory = (category) => {
    if (category === "all") {
      setItems(data);
      return;
    }

    const newItems = data.filter((item) => {
      return item.category === category;
    });

    setItems(newItems);
  };

  return (
    <div className="container">
      <h1>Our Menu</h1>
      <div className='categories'>
        {
          categories.map((category, index) => {
            return <Category key={index}
              category={category} filterCategory={filterCategory} />;
          })
        }
      </div>
      <div className="menus">
        {
          items.map((item) => {
            return <Item key={item.id} {...item} />;
          })
        }
      </div>
    </div>
  );
};

function Item({ title, price, img, desc }) {
  return (
    <div className="food">
      <img src={img} alt={title} />
      <div className="desc">
        <div className="title">
          <h4>{title}</h4>
          <p>${price}</p>
        </div>
        <p className='description'>{desc}</p>
      </div>
    </div>
  );
}

function Category({ category, filterCategory }) {
  return (
    <button onClick={() => { filterCategory(category); }}>
      {category}
    </button>
  );
}

export default Menu;
