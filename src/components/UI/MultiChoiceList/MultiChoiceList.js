import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
import {Menu} from '../Menu/Menu';
import {MultiChoiceItem} from '../MultiChoiceItem/MultiChoiceItem';
import styles from './MultiChoiceList.module.scss';

export const MultiChoiceList = ({choices, type}) => {
  const renderChoiceItems = () => {
    return choices.map(choice => {
      return <MultiChoiceItem key={choice.id} {...choice} type={type} />;
    });
  };

  return (
    <Menu>
      <div className={toClasses(styles.multiChoiceList)}>
        <div className={styles.container}>{renderChoiceItems()}</div>
      </div>
    </Menu>
  );
};

MultiChoiceList.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.number
};
