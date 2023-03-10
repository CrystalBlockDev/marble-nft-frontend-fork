import { useQuery } from 'react-query'
import {
  unsafelyGetTokenInfo,
} from './useTokenInfo'
import { getIBCAssetInfo } from './useIBCAssetInfo'
import { DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL } from '../util/constants'

export const useTokenDollarValueQuery = (tokenSymbols?: Array<string>) => {
  const { data, isLoading } = useQuery(
    `coinDollarValue/${tokenSymbols?.join('/')}`,
    async (): Promise<Array<number>> => {
      const tokenIds = tokenSymbols.map(
        (tokenSymbol) =>
          (unsafelyGetTokenInfo(tokenSymbol) || getIBCAssetInfo(tokenSymbol)).id
      )

      const response = await fetch(getApiUrl(tokenIds), {
        method: 'GET',
      })

      const prices = await response.json()
      return tokenIds.map((id): number => prices[id]?.usd || 0)
    },
    {
      enabled: Boolean(tokenSymbols?.length),
      refetchOnMount: 'always',
      refetchInterval: DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL,
      refetchIntervalInBackground: true,
    }
  )

  return [data || [], isLoading] as const
}

function getApiUrl(tokenIds: Array<string>) {
  return `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds.join(
    ','
  )}&vs_currencies=usd`
}
