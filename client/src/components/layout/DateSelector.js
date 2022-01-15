import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import moment from 'moment';

const DateSelector = ({ updateDateFilter }) => {
  const [filterDate, setFilterDate] = useState();
  return (
    <div>
      <DatePicker
        selected={filterDate}
        onChange={(date) => {
          setFilterDate(date);
          updateDateFilter(date);
        }}
        open={true}
      />
    </div>
  );
};

export default DateSelector;
