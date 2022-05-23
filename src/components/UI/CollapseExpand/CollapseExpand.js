import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as CollapseExpandIcon} from '../../../assets/svg/icons/collapse.svg';
import {toClasses} from '../../../utils';
import styles from './CollapseExpand.module.scss';

export const CollapseExpand = ({isCollapsed, onClick}) => {
  return (
    <CollapseExpandIcon
      className={toClasses(styles.collapseExpand, isCollapsed && styles.collapsed)}
      onClick={onClick}
    />
  );
};

CollapseExpand.propTypes = {
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func
};