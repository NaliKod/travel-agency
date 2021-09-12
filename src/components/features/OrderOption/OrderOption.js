import React from 'react';
import styles from './OrderOption.scss';
import {OrderOptionDropdown} from './OrderOptionDropdown';
import {OrderOptionIcons} from './OrderOptionIcons';
import {OrderOptionCheckboxes} from './OrderOptionCheckboxes';
import {OrderOptionNumber} from './OrderOptionNumber';
import {OrderOptionDate} from './OrderOptionDate';
import {OrderOptionText} from './OrderOptionText';


const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

// class OrderOption extends React.Component {
//   render() {
//     return (
//       <div className={styles.component}>
//         <h3 className={styles.title}></h3>
//       </div>
//     );
//   }
// }

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  console.log(type , OptionComponent);
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          {...otherProps} setOptionValue={value => setOrderOption({[id]: value})}
        />
      </div>
    );
  }
};



export default OrderOption;
