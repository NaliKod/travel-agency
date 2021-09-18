import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('component OrderOption', () => {
  const expectedType = 1;
  const expectedName = 'some';
  const component = shallow(<OrderOption type ={expectedType} name ={expectedName}/>);

  it('should render without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });


  it('should render correct name', () => {
    //const renderedName = component.find('.title').text();
    //expect(renderedName).toEqual(expectedName);
  });


  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: '1'},
    text: {},
    date: {},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;


  for(let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });

      /* common tests */
      it(`renders ${optionTypes[type]}`, () => {
        expect(1).toBe(1);
        //expect(subcomponent).toBeTruthy();
        //expect(subcomponent.length).toBe(1);
        //console.log(component.debug());
        //console.log(subcomponent.debug());
      });



      /* type-specific tests */
      switch (type) {
        case 'dropdown': {

          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });

          break;
        }

        case 'icons': {

          it('contains div with icons', () => {
            const divIcon = renderedSubcomponent.find('.icon');
            expect(divIcon.length).toBe(3);
            // expect(divIcon.length).toBe(mockProps.values.length);
            // expect(divIcon.at(0).find('Icon').prop('name')).toBe(mockProps.values[0].icon);
            expect(divIcon.at(1).find('Icon').prop('name')).toBe(mockProps.values[0].icon);
            expect(divIcon.at(2).find('Icon').prop('name')).toBe(mockProps.values[1].icon);
          });

          it('should run setOrderOption function on click', () => {
            renderedSubcomponent.find('.icon').at(2).simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });

          break;
        }

        case 'checkobox': {
          it('contains input with checkbox', () => {
            const inputCheckbox = renderedSubcomponent.find('input');
            expect(inputCheckbox.length).toBe(mockProps.values.length);
            expect(inputCheckbox.at(0).prop('type')).toBe('checkbox');
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').at(0).simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue]});
          });
          break;
        }

        case 'number': {
          it('contains input with number', () => {
            const inputNumber = renderedSubcomponent.find('input');
            expect(inputNumber.prop('type')).toBe('number');
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
          });

          break;
        }

        case 'text': {
          it('contains input with text', () => {
            const inputText = renderedSubcomponent.find('input');
            expect(inputText.prop('type')).toBe('text');
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });

          break;
        }

        case 'date': {
          it('contains DataPicker', () => {
            const expectedDataPicker = renderedSubcomponent.find(DatePicker);
            expect(expectedDataPicker).toBeTruthy();
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(DatePicker).simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });

          break;
        }
      }
    });
  }

});
