import React from 'react';

const DisplayDetails = (props) => {
  const { dataToDisplay, id } = props;
  if (dataToDisplay[id]) {
    const formattedData = dataToDisplay[id].map((detail) => {
      if (detail.label === 'is_blocked') {
        return (
          <li key={detail.label}>
            <b>
              {detail.label}
              :
            </b>
            {detail.value.toString()}
          </li>
        )
      }
      return (
        <li key={detail.label}>
          <b>
            {detail.label}
            :
          </b>
          {detail.value}
        </li>
      )
    });
    return formattedData;
  }
  return null;
};

export default DisplayDetails;
