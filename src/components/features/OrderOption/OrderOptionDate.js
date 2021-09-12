import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const OrderOptionDate = ({currentValue, setOptionValue}) => (
  <div className={styles.input}>
    <DatePicker
      selected ={currentValue}
      onChange = {setOptionValue}>
    </DatePicker>
  </div>
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue:PropTypes.func,
};
