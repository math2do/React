import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import "./style.css";

const Grocery = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      showAlert(true, "danger", "please enter something");
      return;
    }
    if (name && isEditing) {
      showAlert(true, "success", "item updated");
      const newItems = items.map((item) => {
        if (item.id === editId) {
          item.title = name;
        }
        return item;
      });

      setItems(newItems);
      setIsEditing(false);
      setEditId(null);
      setName("");
      return;
    }

    // add new item
    const item = { id: new Date().getTime().toString(), title: name };

    showAlert(true, "success", "item added to list");
    setItems([...items, item]);
    setName("");
  };

  const showAlert = (show, type, msg) => {
    setAlert({ show, type, msg });
  };

  const editItem = (id) => {
    const item = items.find((item) => item.id === id);

    setName(item.title);
    setIsEditing(true);
    setEditId(id);
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    showAlert(true, "danger", "item removed");
    setItems(newItems);
  };

  const removeAlert = () => {
    setAlert({ show: false, type: "", msg: "" });
  };

  return (
    <div className="section-center">
      <h4>Grocery Bud</h4>
      {alert.show && <Alert {...alert} removeAlert={removeAlert} items={items} />}
      <form onSubmit={handleSubmit}>
        <div className="input">

          <input
            type="text"
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => { setName(e.target.value); }} />

          <button type='submit'>{`${isEditing ? "Update" : "Add Item"}`}</button>
        </div>
        <ItemList items={items} editItem={editItem} removeItem={removeItem} />
        {
          items.length > 0 &&
          <p className='clear' onClick={() => {
            showAlert(true, "danger", "all items removed");
            setItems([]);
          }}>clear all</p>
        }

      </form>
    </div>
  );
};

const Alert = ({ type, msg, removeAlert, items }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [items, removeAlert]);

  return (
    <p className={`alert alert_${type}`} > {msg}</p >
  );
};

const ItemList = ({ items, editItem, removeItem }) => {
  return (
    <div className='item_list'>
      {
        items.map((item) => {
          return <div key={item.id} className="item">
            <p>{item.title}</p>
            <div >
              <FontAwesomeIcon icon={faEdit} className='edit' onClick={() => editItem(item.id)} />
              <FontAwesomeIcon icon={faTrash} className='delete' onClick={() => removeItem(item.id)} />
            </div>
          </div>;
        })
      }
    </div>
  );
};

export default Grocery;
