import { TimeRangePreset } from '../enums/TimeRangePreset'

export const timeRangePresetMapName: Record<TimeRangePreset, string> = {
  [TimeRangePreset.SIX_MONTHS]: '近 6 個月',
  [TimeRangePreset.THREE_YEARS]: '近 3 年',
  [TimeRangePreset.FIVE_YEARS]: '近 5 年',
  [TimeRangePreset.EIGHT_YEARS]: '近 8 年',
}
