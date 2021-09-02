import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

//describe('Component TripSummary', () => {
it('should render without crashing', () => {
  const expectedName = 'abc';
  const expectedImage = 'image.jpg';
  const component = shallow(<TripSummary id='abc' name={expectedName} img ={expectedImage} cost='abc' days='abc'/>);
  expect(component).toBeTruthy();


  const renderedName = component.find('.name').text();
  expect(renderedName).toEqual(expectedName);
  expect(component.find('.image').prop('src')).toEqual(expectedImage);

  console.log(component.debug());

});
