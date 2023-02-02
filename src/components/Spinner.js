import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div style={{ width: '15px', margin: 'auto', display: 'block', float: "right", marginLeft:"3px" }}>
      <ClipLoader color="white" size={15}/>
    </div>
  );
};

export default Spinner;