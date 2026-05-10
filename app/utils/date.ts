import { endOfDay, format, startOfDay, startOfMonth, subMonths } from 'date-fns'
import type { FinMindDate } from '../types/FinMindDate'

export type DateRange = {
  startDate: Date
  endDate: Date
}

export function createRecentDateRange(
  monthCount: number,
  baseDate = new Date(),
): DateRange {
  const endDate = endOfDay(baseDate)

  return {
    startDate: startOfMonth(subMonths(baseDate, monthCount)),
    endDate,
  }
}

export function createWithinDateRange(
  monthCount: number,
  baseDate = new Date(),
): DateRange {
  const endDate = endOfDay(baseDate)

  return {
    startDate: startOfDay(subMonths(baseDate, monthCount)),
    endDate,
  }
}

export function formatFinMindDate(date: Date): FinMindDate {
  return format(date, 'yyyy-MM-dd') as FinMindDate
}
