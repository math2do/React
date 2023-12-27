import { useEffect, useState } from 'react';
import Values from 'values.js';
import './style.css';

const Color = () => {
  const [color, setColor] = useState("");
  const [derivedColors, setDerivedColors] = useState(new Values('#f15025').all(10));
  const [alert, setAlert] = useState({});

  const showAlert = (show, type, msg) => {
    setAlert({ show, type, msg });
  };
  const removeAlert = () => {
    setAlert({ show: false, type: "", msg: "" });
  };

  const generateColors = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setDerivedColors(colors);
    } catch (error) {
      showAlert(true, "danger", "invalid color");
      console.log(error);
    }
  };

  return (
    <div className='container'>
      {alert.show && <Alert {...alert} removeAlert={removeAlert} />}
      <form className='input' onSubmit={generateColors}>
        <h2>Color Generator</h2>
        <input
          placeholder='#f15025'
          type='text'
          onChange={(e) => { setColor(e.target.value); }}
          value={color}
        />
        <button type='submit'>Submit</button>
      </form>
      <div className='colors'>
        {
          derivedColors.map((color, id) => {
            return <SingleColor key={id} index={id} {...color} showAlert={showAlert} hexColor={color.hex} />;
          })
        }
      </div>
    </div >
  );
};

const SingleColor = ({ rgb, weight, index, hexColor, showAlert }) => {
  const bcg = rgb.join(',');
  const hexValue = `#${hexColor}`;

  return (
    <div className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        navigator.clipboard.writeText(hexValue);
        showAlert(true, "success", "copied to clipboard");
      }}>
      <p className='percentage'>{weight}%</p>
      <p className='hex_code'>{hexValue}</p>
    </div>
  );
};

const Alert = ({ type, msg, removeAlert }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAlert]);

  return (
    <p className={`alert alert_${type}`} > {msg}</p >
  );
};


export default Color;
