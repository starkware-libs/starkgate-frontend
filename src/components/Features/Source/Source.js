import {NetworkType} from '@starkware-industries/commons-js-enums';
import React from 'react';

import {depositConfig, withdrawConfig} from '../../../config/sources';
import {ActionType} from '../../../enums';
import {useSourceTranslation, useTransferTracking} from '../../../hooks';
import {useSource} from '../../../providers/SourceProvider';
import {useIsL1, useIsL2, useTransfer} from '../../../providers/TransferProvider';
import {Menu, TransferMenuTab} from '../../UI';
import {ProvidersMenu} from '../ProvidersMenu/ProvidersMenu';
import {Transfer} from '../Transfer/Transfer';
import styles from './Source.module.scss';

export const Source = () => {
  const [trackSwapNetworks] = useTransferTracking();
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const {action} = useTransfer();
  const {depositTxt, withdrawTxt} = useSourceTranslation();
  const {source, selectDefaultSource} = useSource();

  const tabs = [
    {
      text: depositTxt,
      isActive: action === ActionType.TRANSFER_TO_L2,
      onClick: () => {
        onNetworkTabClick(ActionType.TRANSFER_TO_L2);
      }
    },
    {
      text: withdrawTxt,
      isActive: action === ActionType.TRANSFER_TO_L1,
      onClick: () => {
        onNetworkTabClick(ActionType.TRANSFER_TO_L1);
      }
    }
  ];

  const maybeSelectDefaultSource = () => {
    const config = isL1 ? withdrawConfig : depositConfig;
    if (!Object.values(config).some(map => map[source])) {
      selectDefaultSource();
    }
  };

  const onNetworkSwap = () => {
    trackSwapNetworks();
    isL2 ? swapToL1() : swapToL2();
  };

  const onNetworkTabClick = tab => {
    if (action !== tab) {
      maybeSelectDefaultSource();
      onNetworkSwap();
    }
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={tab.isActive}
          text={tab.text}
          onClick={tab.onClick}
        />
      );
    });
  };

  return (
    <Menu>
      <div className={styles.source}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        {source === NetworkType.L1 ? <Transfer onNetworkSwap={onNetworkSwap} /> : <ProvidersMenu />}
      </div>
    </Menu>
  );
};
