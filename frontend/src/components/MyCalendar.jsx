import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={[]} 
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, width: '100%' }} 
        components={{
          toolbar: CustomToolbar,
        }}
        views={['month']}
        defaultView="month"
      />
    </div>
  );
};

export default MyCalendar;
