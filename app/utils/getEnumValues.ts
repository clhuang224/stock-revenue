export function getEnumValues<TEnum extends Record<string, string | number>>(
  enumObject: TEnum,
) {
  const enumKeys = new Set(Object.keys(enumObject))

  return Object.values(enumObject).filter(
    (value) => typeof value !== 'string' || !enumKeys.has(value),
  ) as TEnum[keyof TEnum][]
}
