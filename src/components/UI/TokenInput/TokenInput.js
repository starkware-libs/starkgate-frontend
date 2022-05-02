import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import utils from '../../../utils';
import {MaxButton} from '../MaxButton/MaxButton';
import {TokenSelector} from '../TokenSelector/TokenSelector';
import {Input} from '../index';
import styles from './TokenInput.module.scss';

export const TokenInput = ({
  value,
  hasError,
  tokenData,
  onMaxClick,
  onTokenSelect,
  onInputChange
}) => {
  const {inputPlaceholderTxt} = useTransferTranslation();

  return (
    <div className={utils.object.toClasses(styles.tokenInput, hasError && styles.hasError)}>
      <Input
        placeholder={inputPlaceholderTxt}
        style={{
          fontSize: '24px',
          fontWeight: '600'
        }}
        type="number"
        value={value}
        onChange={onInputChange}
      />
      {/*
      TODO: Temporary remove the max button until estimateGas logic will be added
      <MaxButton onClick={onMaxClick} />
      */}
      <TokenSelector tokenData={tokenData} onClick={onTokenSelect} />
    </div>
  );
};

TokenInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hasError: PropTypes.bool,
  tokenData: PropTypes.object,
  onMaxClick: PropTypes.func,
  onTokenSelect: PropTypes.func,
  onInputChange: PropTypes.func
};
