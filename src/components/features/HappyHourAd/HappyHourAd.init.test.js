import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

describe('component HappyHourAd', () => {

  const select = {
    title: '.title',
    description: '.promoDescription',
  };

  const mockProps = {
    title: 'Promotion',
    promoDescription: 'You have a promotion 20%',
  };


  const trueDate = Date;
  const mockDate = customDate => class extends Date {
    constructor(...args) {
      if(args.length){
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now(){
      return (new Date(customDate)).getTime();
    }
  };

  const checkDescriptionAtTime = (time, expectedDescription) => {
    it(`should show correct at ${time}`, () => {
      global.Date = mockDate(`2019-05-14T${time}.135Z`);

      const component = shallow(<HappyHourAd {...mockProps} />);
      const renderedTime = component.find(select.description).text();
      expect(renderedTime).toEqual(expectedDescription);

      global.Date = trueDate;
    });
  };

  const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
    it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
      jest.useFakeTimers();
      global.Date = mockDate(`2020-03-24T${time}.135Z`);

      const component = shallow(<HappyHourAd {...mockProps} />);

      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + delaySeconds);
      global.Date = mockDate(newTime.getTime());

      jest.advanceTimersByTime(delaySeconds * 1000);

      const renderedTime = component.find(select.description).text();
      expect(renderedTime).toEqual(expectedDescription);

      global.Date = trueDate;
      jest.useRealTimers();

    });
  };

  describe('Component HappyHourAd with mocked Date', () => {
    checkDescriptionAtTime('11:57:58', '00:02:02');
    checkDescriptionAtTime('11:59:59', '00:00:01');
    checkDescriptionAtTime('13:00:00', '23:00:00');
  });

  describe('Component HappyHourAd with mocked Date', () => {
    checkDescriptionAfterTime('11:57:58', 5, '00:01:57');
    checkDescriptionAfterTime('11:59:56', 3, '00:00:01');
    checkDescriptionAfterTime('13:00:00', 2 * 60 * 60, '21:00:00');
  });

});
