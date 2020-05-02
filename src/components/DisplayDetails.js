import React from 'react';

const DisplayDetails = (props) => {
  const { dataToDisplay, id } = props;
  if (dataToDisplay[id]) {
    return dataToDisplay[id].map((detail) => (
      <li key={detail.label}>
        <b>
          {detail.label}
          :
        </b>
        {detail.value === null ? '' : detail.value.toString()}
      </li>
    ));
  }
  return null;
};

export default DisplayDetails;
