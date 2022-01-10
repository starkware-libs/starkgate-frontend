import React from 'react';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {useEthereumWallet, useStarknetWallet, useWallets} from '../../../providers/WalletsProvider';
import {toClasses} from '../../../utils';
import {useBridgeActions} from '../../Features/Bridge/Bridge.hooks';
import {useIsEthereum, useIsStarknet} from '../../Features/Transfer/Transfer.hooks';
import {WalletButton} from '../../UI';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName, isConnected} = useWallets();
  const {showAccountMenu, showTransferMenu} = useBridgeActions();
  const [, setEthereum] = useIsEthereum();
  const [, setStarknet] = useIsStarknet();
  const {
    account: ethereumAccount,
    isConnected: isEthereumConnected,
    config: ethereumConfig
  } = useEthereumWallet();
  const {
    account: starknetAccount,
    isConnected: isStarknetConnected,
    config: starknetConfig
  } = useStarknetWallet();

  const onStarknetWalletButtonClick = () => {
    setStarknet();
    showAccountMenu();
  };

  const onEthereumWalletButtonClick = () => {
    setEthereum();
    showAccountMenu();
  };

  const onLogoClick = () => {
    showTransferMenu();
  };

  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
        </div>
        {isConnected && (
          <div className={toClasses(styles.chain, 'row')}>{CHAIN_TXT(chainName)}</div>
        )}
      </div>

      <div className={toClasses(styles.right, 'row')}>
        {isEthereumConnected && (
          <WalletButton
            account={ethereumAccount}
            logoPath={ethereumConfig?.logoPath}
            onClick={onEthereumWalletButtonClick}
          />
        )}
        {isStarknetConnected && (
          <WalletButton
            account={starknetAccount}
            logoPath={starknetConfig?.logoPath}
            onClick={onStarknetWalletButtonClick}
          />
        )}
      </div>
    </div>
  );
};
