export function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

export function formatPercent(value: number | null) {
  return value === null ? '-' : value.toFixed(2)
}
