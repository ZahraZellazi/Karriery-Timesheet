import React, { useState } from 'react';
import './AddHoursModal.css'; 

const AddHoursModal = ({ isOpen, onClose }) => {
  const [hoursWorked, setHoursWorked] = useState('');
  const [holidayType, setHolidayType] = useState('');
  const [otherHoliday, setOtherHoliday] = useState('');
  const [isOtherHoliday, setIsOtherHoliday] = useState(false);

  const handleHolidayTypeChange = (e) => {
    const selectedType = e.target.value;
    setHolidayType(selectedType);
    setIsOtherHoliday(selectedType === 'OTHER');
    if (selectedType !== 'OTHER') {
      setOtherHoliday(''); 
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (Number(hoursWorked) <= 0) {
      alert('Please enter a valid number of hours greater than zero.');
      return;
    }

    if (holidayType === 'OTHER' && !otherHoliday.trim()) {
      alert('Please specify the other holiday type.');
      return;
    }

    console.log({ hoursWorked, holidayType, otherHoliday });
    
    setHoursWorked('');
    setHolidayType('');
    setOtherHoliday('');
    setIsOtherHoliday(false);

    onClose();
  };

  const isFormIncomplete = () => {
    return !hoursWorked || !holidayType || (holidayType === 'OTHER' && !otherHoliday.trim());
  };

  return isOpen ? (
    <div className="add-hours-modal-overlay" role="dialog" aria-modal="true">
      <div className="add-hours-modal-content">
        <button 
          className="add-hours-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2>Add Work Hours</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="hoursWorked">Hours Worked</label>
          <input
            id="hoursWorked"
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            required
            aria-required="true"
            aria-label="Hours Worked"
            min="1"
          />
          
          <label htmlFor="holidayType">Is this day a holiday?</label>
          <select
            id="holidayType"
            value={holidayType}
            onChange={handleHolidayTypeChange}
            required
            aria-required="true"
            aria-label="Holiday Type"
          >
            <option value="">Select a Holiday Type</option>
            <option value="PUBLIC_HOLIDAY">Public Holiday</option>
            <option value="PERSONNEL_HOLIDAY">Personnel Holiday</option>
            <option value="OTHER">Other</option>
          </select>
          
          {isOtherHoliday && (
            <div className="other-holiday-input">
              <label htmlFor="otherHoliday">Specify Other Holiday</label>
              <input
                id="otherHoliday"
                type="text"
                value={otherHoliday}
                onChange={(e) => setOtherHoliday(e.target.value)}
                required
                aria-required="true"
                aria-label="Other Holiday Type"
              />
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isFormIncomplete()}
            aria-disabled={isFormIncomplete()}
          >
            Add Hours
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddHoursModal;
