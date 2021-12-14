import {useCallback, useState} from 'react';

import {depositEth, depositToken} from '../api/bridge';
import {approve} from '../api/erc20';
import {useStarknetWallet, useWallets} from '../providers/WalletsProvider/hooks';
import {listenOnce} from '../utils/contract';
import {
  useEthBridgeContract,
  useMessagingContract,
  useTokenBridgeContract,
  useTokenContract
} from './useContract';

const PROGRESS = {
  approval: symbol => ({
    type: 'approval',
    message: `Requesting permission to access your ${symbol} funds`
  }),
  deposit: (amount, symbol) => ({
    type: 'deposit',
    message: `Depositing ${amount} ${symbol} to StarkNet`
  })
};

export const useTransferToStarknet = tokenData => {
  const {tokenAddress, bridgeAddress, symbol} = tokenData;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const {account: ethereumAccount, chainId} = useWallets();
  const {account: starknetAccount} = useStarknetWallet();
  const tokenContract = useTokenContract(tokenAddress);
  const tokenBridgeContract = useTokenBridgeContract(bridgeAddress);
  const ethBridgeContract = useEthBridgeContract();
  const messagingContract = useMessagingContract();

  const waitForLogMessageToL2 = () => {
    return new Promise((resolve, reject) => {
      listenOnce(messagingContract, 'LogMessageToL2', (error, event) => {
        if (error) {
          reject(error);
        }
        resolve(event);
      });
    });
  };

  const transferEthToStarknet = useCallback(
    async amount => transferToStarknet(amount, depositEth, ethBridgeContract, false),
    [ethereumAccount, starknetAccount, tokenContract]
  );

  const transferTokenToStarknet = useCallback(
    async amount => transferToStarknet(amount, depositToken, tokenBridgeContract, true),
    [ethereumAccount, starknetAccount, tokenContract]
  );

  const transferToStarknet = async (amount, depositHandler, bridgeContract, withApproval) => {
    try {
      resetState();
      setIsLoading(true);
      let approvalPromise = Promise.resolve();
      if (withApproval) {
        setProgress(PROGRESS.approval(symbol));
        approvalPromise = approve(bridgeAddress[chainId], amount, tokenContract, ethereumAccount);
      }
      await approvalPromise;
      setProgress(PROGRESS.deposit(amount, symbol));
      const depositPromise = depositHandler(
        starknetAccount,
        amount,
        bridgeContract,
        ethereumAccount
      );
      const depositEvent = await waitForLogMessageToL2();
      const depositReceipt = await depositPromise;
      setIsLoading(false);
      setProgress(null);
      setData([depositReceipt, depositEvent]);
    } catch (ex) {
      setIsLoading(false);
      setProgress(null);
      setError(ex);
    }
  };

  const resetState = () => {
    setError(null);
    setData(null);
    setProgress(null);
    setIsLoading(false);
  };

  return {
    isTransferring: isLoading,
    transferProgress: progress,
    transferError: error,
    transferData: data,
    transferTokenToStarknet,
    transferEthToStarknet
  };
};
