import React from 'react';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';

import { Row, Col } from 'react-flexbox-grid';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import settings from '../../../data/settings.js';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';

const sendOrder = (options, tripCost, tripName, tripCountryCode, tripId) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripCountryCode,
    tripId,
  };

  if(payload.contact != '' && payload.name != '') {

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
  else {
    alert('Provide name and contact informations to continue proceeding.');
  }
};

const OrderForm = props =>
  (
    <Row>
      {pricing.map((option) =>
        <Col md={4} key={option.id}><OrderOption {...option} currentValue={props.options[option.id]} setOrderOption={props.setOrderOption} /></Col>
      )}
      <Col xs={12}>
        <OrderSummary cost={props.tripCost} options={props.options} />
      </Col>
      <Button onClick={() => sendOrder(props.options, props.tripCost, props.tripId, props.tripCountryCode, props.tripName)}>Order now!</Button>
      {console.log('tripDetails',props.tripId, props.tripCountryCode, props.tripName)}
    </Row>
  );

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.any,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripCountryCode: PropTypes.string,
  tripName: PropTypes.string,
};

export default OrderForm;

