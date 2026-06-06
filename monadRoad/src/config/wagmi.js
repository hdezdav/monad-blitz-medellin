import { createConfig, http } from 'wagmi'
import { monadTestnet } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY || 'LbFkGjLsTGrg0G0bhBGw4'

const monadTestnetRpc = alchemyApiKey
  ? `https://monad-testnet.g.alchemy.com/v2/${alchemyApiKey}`
  : 'https://testnet-rpc.monad.xyz'

// Monad Testnet config (switch to mainnet for production)
export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID || 'demo',
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'light',
      },
    }),
  ],
  transports: {
    [monadTestnet.id]: http(monadTestnetRpc),
  },
})
