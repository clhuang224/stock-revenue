import { TimeRangePreset } from '../enums/TimeRangePreset'

export const timeRangePresetMapMonthCount: Record<TimeRangePreset, number> = {
  [TimeRangePreset.SIX_MONTHS]: 6,
  [TimeRangePreset.THREE_YEARS]: 36,
  [TimeRangePreset.FIVE_YEARS]: 60,
  [TimeRangePreset.EIGHT_YEARS]: 96,
}
