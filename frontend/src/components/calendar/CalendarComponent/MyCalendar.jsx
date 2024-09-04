import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as XLSX from 'xlsx';
import './Calendar.scss';
import DropdownYears from '../../buttons/Dropdown/dropdown';
import Header from '../calendarHeader/Header';
import AddHoursModal from '../../modals/AddHours/AddHours Modal';
const MyCalendar = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exportEnabled, setExportEnabled] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  const calendarRef = React.createRef();

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

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    const calendarApi = calendarRef.current.getApi();
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const currentDay = new Date().getDate().toString().padStart(2, '0');
    if (year === new Date().getFullYear()) {
      calendarApi.gotoDate(`${year}-${currentMonth}-${currentDay}`);
    } else {
      calendarApi.gotoDate(`${year}-01-01`);
    }
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // Store the selected date
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="calendar-container">
      <Header />
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
      <div className="dropdown-years">
        <DropdownYears selectedYear={selectedYear} onYearChange={handleYearSelect} />
      </div>
      <div className='calendar-card'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable
          dateClick={handleDateClick} // Trigger the modal on date click
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          style={{ height: '450px', width: '100%', margin: '0 auto' }}
        />
      </div>
      <AddHoursModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        selectedDate={selectedDate} // Pass the selected date to the modal
      />
    </div>
  );
};

export default MyCalendar;
