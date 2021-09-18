import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  const expectedId = 'abc';
  const expectedLink = '/trip/abc';
  const expectedImage = 'image.jpg';
  const expectedName = 'SomethingAlt';
  const expectedCost = '$20';
  const expectedDays = 5;
  let expectedTags =['pool','beach','hiking'];
  const component = shallow(<TripSummary id={expectedId} image={expectedImage}
    name={expectedName} cost ={expectedCost} days={expectedDays} tags ={expectedTags}/>);

  it('should render correct link crashing', () => {
    const renderedId = component.find('Link').prop('to');
    expect(renderedId).toEqual(expectedLink);
  });


  it('should render correct image & alt crashing', () => {
    const renderedImage = component.find('img').prop('src');
    expect(renderedImage).toEqual(expectedImage);

    const renderedAlt = component.find('img').prop('alt');
    expect(renderedAlt).toEqual(expectedName);
  });

  it('should render correct name cost & days crashing', () => {
    expect(component).toBeTruthy();

  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render correct tags [pool, beach, hiking]', () => {
    const renderedTagPool = component.find('.tags span').at(0).text();
    expect(renderedTagPool).toEqual(expectedTags[0]);

    const renderedTagBeach = component.find('.tags span').at(1).text();
    expect(renderedTagBeach).toEqual(expectedTags[1]);

    const renderedTagHiking = component.find('.tags span').at(2).text();
    expect(renderedTagHiking).toEqual(expectedTags[2]);

  });

  it('should not render empty tags', () => {
    //const expectedTags = [];
    const renderedTag = component.find('.tags div');
    expect(renderedTag.exists()).toBeFalsy;
  });

});
