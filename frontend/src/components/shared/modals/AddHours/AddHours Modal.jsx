import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import "./AddHoursModal.css";

const AddHoursModal = ({ isOpen, onClose, selectedDate }) => {
  const [selectionMade, setSelectionMade] = useState(false);
  const [isWorkDay, setIsWorkDay] = useState(null);
  const [hoursWorked, setHoursWorked] = useState('');
  const [holidayType, setHolidayType] = useState('');
  const [otherHoliday, setOtherHoliday] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setStartDay(selectedDate);
    }
  }, [selectedDate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dayOfWeek = new Date(selectedDate).getDay();
    const year = new Date(selectedDate).getFullYear();

    const body = {
      userId: 7,
      year,
      dayNumber: dayOfWeek + 1,
      dayName: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(selectedDate)),
      hours: isWorkDay ? hoursWorked : null,
      holidayType: !isWorkDay ? holidayType : null,
      otherHoliday: holidayType === 'OTHER' ? otherHoliday : null,
      startDay: !isWorkDay ? startDay : null,
      endDay: !isWorkDay ? endDay : null,
    };

    try {
      const res = await axios.post('http://localhost:7050/calendars', body);
      alert('Data submitted successfully!');
      setHoursWorked('');
      setHolidayType('');
      setOtherHoliday('');
      setStartDay(selectedDate);
      setEndDay('');
      onClose();
    } catch (error) {
      console.error('Error posting data:', error);
      setErrorMessage('Failed to submit data. Please try again.');
    }
  };

  const handleWorkDaySelect = () => {
    setIsWorkDay(true);
    setSelectionMade(true);
  };

  const handleHolidaySelect = () => {
    setIsWorkDay(false);
    setSelectionMade(true);
  };

  const handleReturn = () => {
    setSelectionMade(false);
    setIsWorkDay(null);
  };

  return (
    isOpen && (
      <div className="add-hours-modal-overlay">
        <div className="add-hours-modal-content">
          {selectionMade && (
            <button className="return-arrow" onClick={handleReturn}>
              <FaArrowLeft />
            </button>
          )}

          <button className="add-hours-modal-close" onClick={onClose}>×</button>
          <h2>Add Hours or Holiday</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {!selectionMade && (
            <div>
              <label>
                <input
                  type="radio"
                  value="workDay"
                  checked={isWorkDay === true}
                  onChange={handleWorkDaySelect}
                />
                Work Day
              </label>
              <label>
                <input
                  type="radio"
                  value="holiday"
                  checked={isWorkDay === false}
                  onChange={handleHolidaySelect}
                />
                Holiday
              </label>
            </div>
          )}

          {selectionMade && isWorkDay && (
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="hoursWorked">Hours Worked:</label>
              <input
                type="number"
                id="hoursWorked"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                required
              />
              <div className="btn-group">
                <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}

          {selectionMade && !isWorkDay && (
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="startDay">Start Day:</label>
              <input
                type="date"
                id="startDay"
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
                required
              />

              <label htmlFor="endDay">End Day:</label>
              <input
                type="date"
                id="endDay"
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
                required
              />

              <label htmlFor="holidayType">Holiday Type:</label>
              <select
                id="holidayType"
                value={holidayType}
                onChange={(e) => setHolidayType(e.target.value)}
                required
              >
                <option value="">Select Holiday Type</option>
                <option value="PUBLIC_HOLIDAY">Public Holiday</option>
                <option value="OTHER">Other</option>
              </select>

              {holidayType === 'OTHER' && (
                <input
                  type="text"
                  placeholder="Specify other holiday"
                  value={otherHoliday}
                  onChange={(e) => setOtherHoliday(e.target.value)}
                />
              )}

              <div className="btn-group">
                <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  );
};

export default AddHoursModal;
