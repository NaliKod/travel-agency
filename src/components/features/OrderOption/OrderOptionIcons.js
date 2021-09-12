import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice';

export const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    {required ? '' : (
      <div className={currentValue == '' ? `${styles.icon} ${styles.iconActive}` : styles.icon}
        value=''
        onClick={() => setOptionValue()}
      ><Icon name='times-circle'/>None</div>

    )}
    {values.map(value => (
      <div key={value.id}
        className={value.id == currentValue ? `${styles.icon} ${styles.iconActive}` : styles.icon}
        onClick={() => setOptionValue(value.id)}>
        <Icon name={value.icon}/> {value.name} ({formatPrice(value.price)})
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue:PropTypes.func,
  name:PropTypes.string,
};
