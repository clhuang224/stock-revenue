'use client'

import { useCallback, useState } from 'react'

const stockIdStorageKey = 'stock-revenue:selected-stock-id'

type UsePersistedStockIdResult = {
  stockId: string
  isReady: boolean
  setStockId: (stockId: string) => void
}

export default function usePersistedStockId(
  defaultStockId: string,
): UsePersistedStockIdResult {
  const [stockId, setStockIdState] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultStockId
    }

    return window.localStorage.getItem(stockIdStorageKey) ?? defaultStockId
  })

  const setStockId = useCallback((nextStockId: string) => {
    setStockIdState(nextStockId)
    window.localStorage.setItem(stockIdStorageKey, nextStockId)
  }, [])

  return {
    stockId,
    isReady: true,
    setStockId,
  }
}
