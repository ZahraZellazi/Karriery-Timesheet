import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import './Calendar.scss';

const MyCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exportEnabled, setExportEnabled] = useState(false);
  const [calendarWidth, setCalendarWidth] = useState('100%'); 

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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" 
        selectable
        dateClick={(info) => {
          if (!startDate) {
            handleStartDateChange(info.date);
          } else {
            handleEndDateChange(info.date);
          }
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        style={{ height: '450px', width: calendarWidth }} // Fixed height and controllable width
      />
    </div>
  );
};

export default MyCalendar;
