import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.scss'; 

const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const label = toolbar.label;

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={goToBack}>
          <FaArrowLeft /> 
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button onClick={goToNext}>
          <FaArrowRight /> 
        </button>
      </span>
    </div>
  );
};

const MyCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exportEnabled, setExportEnabled] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
      setExportEnabled(false);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date >= startDate) {
      setExportEnabled(true);
    }
  };

  const exportToExcel = () => {
    const data = [
      ['Start Date', startDate?.toLocaleDateString()],
      ['End Date', endDate?.toLocaleDateString()],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'file');
    XLSX.writeFile(wb, 'file.xlsx');
  };

  return (
    <div className="calendar-container">
      <div className="date-picker-container">
        <div>
          <label>Start Date: </label>
          <div className="react-datepicker-wrapper">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Start Date"
              minDate={null}
              maxDate={endDate}
              showPopperArrow={false}
            />
            <FaCalendarAlt className="calendar-icon" />
          </div>
        </div>
        <div>
          <label>End Date: </label>
          <div className="react-datepicker-wrapper">
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select End Date"
              minDate={startDate}
              showPopperArrow={false}
            />
            <FaCalendarAlt className="calendar-icon" />
          </div>
        </div>
        <button
          className="export-btn"
          onClick={exportToExcel}
          disabled={!exportEnabled}
        >
          Export to Excel
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={[]} 
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={({ start }) => {
          if (!startDate) {
            handleStartDateChange(start);
          } else {
            handleEndDateChange(start);
          }
        }}
        style={{ height: 650, width: '100%' }} 
        components={{ toolbar: CustomToolbar }}
        views={['month']}
        defaultView="month"
      />
    </div>
  );
};

export default MyCalendar;
