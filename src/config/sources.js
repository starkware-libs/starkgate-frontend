import {ChainType, NetworkType} from '@starkware-industries/commons-js-enums';

export const categories = {
  chains: {
    label: 'Chains'
  },
  fiat: {label: 'Fiat on-ramp'},
  exchanges: {
    label: 'Exchanges'
  }
};

export const sources = {
  [NetworkType.L1]: {
    label: 'Ethereum Mainnet',
    icon: {
      path: 'tokens/ETH'
    }
  },
  polygon: {
    label: 'Polygon',
    icon: {
      path: 'chains/polygon'
    }
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: {
      path: 'chains/arbitrum',
      background: false
    }
  },
  optimism: {
    label: 'Optimism',
    icon: {
      path: 'chains/optimism',
      background: false
    }
  },
  other_chains: {
    label: 'Other Chains',
    description: 'Transfer crypto between centralized exchanges and StarkNet',
    icon: {
      path: 'icons/chains'
    }
  },
  card: {
    label: 'Payment Card',
    icon: {
      path: 'icons/card'
    }
  },
  ftx: {
    label: 'Ftx.com',
    icon: {
      path: 'exchanges/ftx'
    }
  },
  coinbase: {
    label: 'Coinbase',
    icon: {
      path: 'exchanges/coinbase',
      background: false
    }
  },
  okx: {
    label: 'OKX',
    icon: {
      path: 'exchanges/okx'
    }
  },
  huobi: {
    label: 'Huobi',
    icon: {
      path: 'exchanges/huobi'
    }
  },
  other_exchanges: {
    label: 'Other Exchanges',
    description: 'Transfer crypto between exchanges and StarkNet',
    icon: {
      path: 'icons/exchange'
    }
  }
};

export const providers = [
  {
    id: 'banxa',
    logoPath: 'providers/banxa.svg',
    label: 'Banxa',
    description: 'Buy crypto with credit card directly to StarkNet',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://starkware.banxa.com/',
        qsParams: {
          walletAddress: '{{accountL2}}'
        }
      }
    }
  },
  {
    id: 'ramp',
    logoPath: 'providers/ramp.svg',
    label: 'Ramp',
    description: 'Buy crypto with credit card directly to StarkNet',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://ramp.network/buy/',
        qsParams: {
          defaultAsset: 'STARKNET_ETH'
        }
      }
    }
  },
  {
    id: 'layerswap',
    logoPath: 'providers/layerswap.svg',
    label: 'Layerswap',
    description: 'Move crypto from Coinbase, Binance, FTX and other exchanges to StarkNet',
    link: {
      [ChainType.L1.GOERLI]: {
        url: 'https://testnet.layerswap.io/',
        qsParams: {
          destNetwork: 'starknet_goerli'
        }
      },
      [ChainType.L1.MAIN]: {
        url: 'https://layerswap.io/',
        qsParams: {
          destNetwork: 'starknet_mainnet'
        }
      }
    }
  },
  {
    id: 'orbiter',
    logoPath: 'providers/orbiter.svg',
    label: 'Orbiter',
    description: 'Cross-rollup bridge. Make deposits from other L2 rollups to StarkNet',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://www.orbiter.finance/',
        qsParams: {
          refer: 'starknet',
          dests: 'starknet'
        }
      }
    }
  }
];

export const depositConfig = {
  chains: {
    [NetworkType.L1]: [],
    polygon: ['orbiter'],
    arbitrum: ['orbiter'],
    optimism: ['orbiter'],
    other_chains: ['orbiter']
  },
  fiat: {
    card: ['banxa', 'ramp']
  },
  exchanges: {
    ftx: ['layerswap'],
    coinbase: ['layerswap'],
    okx: ['layerswap'],
    huobi: ['layerswap'],
    other_exchanges: ['layerswap']
  }
};

export const withdrawConfig = {
  chains: {
    [NetworkType.L1]: [],
    polygon: ['orbiter'],
    arbitrum: ['orbiter'],
    optimism: ['orbiter'],
    other_chains: ['orbiter']
  },
  exchanges: {
    ftx: ['layerswap'],
    coinbase: ['layerswap'],
    okx: ['layerswap'],
    huobi: ['layerswap'],
    other_exchanges: ['layerswap']
  }
};
