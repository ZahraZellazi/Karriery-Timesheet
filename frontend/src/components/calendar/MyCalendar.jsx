import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as XLSX from 'xlsx';
import './Calendar.scss';

const MyCalendar = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exportEnabled, setExportEnabled] = useState(false);
  const [calendarWidth, setCalendarWidth] = useState('100%');

  const minDate = '1000-01-01'; 
  const maxDate = '3000-12-31'; 

  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate('');
      setExportEnabled(false);
    } else {
      setExportEnabled(endDate !== '');
    }
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    setExportEnabled(startDate && date >= startDate);
  };

  const exportToExcel = () => {
    const data = [
      ['Start Date', formatDate(startDate)],
      ['End Date', formatDate(endDate)],
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
          <label htmlFor="start">Start Date: </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={startDate}
            min={minDate}
            max={maxDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor="end">End Date: </label>
          <input
            type="date"
            id="end"
            name="trip-end"
            value={endDate}
            min={startDate || minDate} 
            max={maxDate}
            onChange={handleEndDateChange}
          />
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
            handleStartDateChange({ target: { value: info.dateStr } });
          } else {
            handleEndDateChange({ target: { value: info.dateStr } });
          }
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        style={{ height: '450px', width: calendarWidth }} 
      />
    </div>
  );
};

export default MyCalendar;
