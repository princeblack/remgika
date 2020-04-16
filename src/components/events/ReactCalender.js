import React, { useState, useEffect } from 'react'
import DatePicker, { addMonths } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
const ReactCalender = ()=>{
  const [startDate, setStartDate] = useState(new Date());
    // const onChange = ()=>{
    //     setDate(date)
    // }
    return (
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          showDisabledMonthNavigation
          isClearable
          showYearDropdown
          scrollableYearDropdown
        >
          <div style={{ color: "red" }}>Don't forget to check the weather!</div>
        </DatePicker>
      </div>
    );
}

export default ReactCalender;