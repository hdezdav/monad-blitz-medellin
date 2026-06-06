import { createConfig, http } from 'wagmi'
import { monadTestnet } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Monad Testnet config (switch to mainnet for production)
export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID || 'demo',
    }),
  ],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})
