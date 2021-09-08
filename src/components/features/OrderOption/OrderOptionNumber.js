import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumber = ({price, limits, currentValue, setOptionValue}) => (
  <div className={styles.number}>
    <input
      className={styles.inputSmall}
      type="number"
      value={currentValue}
      max ={limits.max}
      min ={limits.min}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
    ({formatPrice(price)})
  </div>

);


OrderOptionNumber.propTypes = {
  limits: PropTypes.object,
  currentValue: PropTypes.string,
  setOptionValue:PropTypes.func,
  price:PropTypes.any,
};
