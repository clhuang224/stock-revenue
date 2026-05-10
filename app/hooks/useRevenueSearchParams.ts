'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { isAfter } from 'date-fns'
import { DEFAULT_STOCK_ID } from '../constants/defaultStockId'
import type { DateRange } from '../utils/date'
import { formatDateParam, parseDateParam } from '../utils/date'

const stockQueryParam = 'stock'
const startAtQueryParam = 'start_at'
const endAtQueryParam = 'end_at'
const revenueSearchParamsChangeEvent = 'revenue-search-params-change'

type RevenueSearchParamsState = {
  stockId: string
  dateRange: DateRange | null
}

function subscribeToRevenueSearchParams(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(revenueSearchParamsChangeEvent, onChange)

  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(revenueSearchParamsChangeEvent, onChange)
  }
}

function getRevenueSearchParamsSnapshot() {
  return window.location.search
}

function getRevenueSearchParamsServerSnapshot() {
  return null
}

function getStockIdFromSearchParams(searchParams: URLSearchParams) {
  return searchParams.get(stockQueryParam) ?? DEFAULT_STOCK_ID
}

function getDateRangeFromSearchParams(
  searchParams: URLSearchParams,
): DateRange | null {
  const startDate = parseDateParam(searchParams.get(startAtQueryParam))
  const endDate = parseDateParam(searchParams.get(endAtQueryParam))

  if (!startDate || !endDate || isAfter(startDate, endDate)) {
    return null
  }

  return {
    startDate,
    endDate,
  }
}

function getRevenueSearchParamsState(
  searchParamsSnapshot: string | null,
): RevenueSearchParamsState {
  const searchParams = new URLSearchParams(searchParamsSnapshot ?? '')

  return {
    stockId: getStockIdFromSearchParams(searchParams),
    dateRange: getDateRangeFromSearchParams(searchParams),
  }
}

function updateRevenueSearchParams({
  stockId,
  dateRange,
}: RevenueSearchParamsState) {
  const nextUrl = new URL(window.location.href)
  nextUrl.searchParams.set(stockQueryParam, stockId)

  if (dateRange) {
    nextUrl.searchParams.set(
      startAtQueryParam,
      formatDateParam(dateRange.startDate),
    )
    nextUrl.searchParams.set(
      endAtQueryParam,
      formatDateParam(dateRange.endDate),
    )
  } else {
    nextUrl.searchParams.delete(startAtQueryParam)
    nextUrl.searchParams.delete(endAtQueryParam)
  }

  window.history.replaceState(null, '', nextUrl.toString())
  window.dispatchEvent(new Event(revenueSearchParamsChangeEvent))
}

export default function useRevenueSearchParams() {
  const searchParamsSnapshot = useSyncExternalStore(
    subscribeToRevenueSearchParams,
    getRevenueSearchParamsSnapshot,
    getRevenueSearchParamsServerSnapshot,
  )
  const state = useMemo(
    () => getRevenueSearchParamsState(searchParamsSnapshot),
    [searchParamsSnapshot],
  )
  const isReady = searchParamsSnapshot !== null

  const setStockId = useCallback(
    (nextStockId: string) => {
      const nextState = {
        ...state,
        stockId: nextStockId,
      }

      updateRevenueSearchParams(nextState)
    },
    [state],
  )

  const setDateRange = useCallback(
    (nextDateRange: DateRange) => {
      const nextState = {
        ...state,
        dateRange: nextDateRange,
      }

      updateRevenueSearchParams(nextState)
    },
    [state],
  )

  return {
    isReady,
    stockId: state.stockId,
    dateRange: state.dateRange,
    setStockId,
    setDateRange,
  }
}
