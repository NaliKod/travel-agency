import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const OrderOptionDate = ({currentValue, setOptionValue}) => (
  <div>
    <DatePicker
      className ={styles.input}
      value ={currentValue}
      selected ={currentValue}
      onChange = {setOptionValue}>
        Choose a date
    </DatePicker>
  </div>
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue:PropTypes.func,
};