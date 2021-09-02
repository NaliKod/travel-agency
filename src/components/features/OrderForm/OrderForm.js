import React from 'react';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';

import {Row, Col} from 'react-flexbox-grid';

const OrderForm = props =>
  (
    <Row>
      <Col xs={12}>
        {console.log(props.options)}
        <OrderSummary cost ={props.tripCost} options={props.options} />
      </Col>
    </Row>
  );

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.any,
};

export default OrderForm;
