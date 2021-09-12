import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


export const OrderOptionText = ({currentValue,setOptionValue}) =>(
  <div>
    <input
      className={styles.input}
      type='text'
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}
      placeholder={'Enter your data'}
    />
  </div>

);

OrderOptionText.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue:PropTypes.func,
};
