export const padLeadZero = (value: string | number, digit = 2) => {
  const data = value.toString()

  // 開頭是否有正負數符號
  const hasaNumberSign = data.match(/^[+-].*/) ? true : false

  const numberSign = hasaNumberSign ? data.slice(0, 1) : ""

  const unsignedValue = hasaNumberSign ? data.slice(1) : data

  // 檢查是否帶有小數
  const [start, end] = unsignedValue.split(".")

  const paddedStart = start.padStart(digit, "0")

  if (end === undefined) return paddedStart

  return `${numberSign}${paddedStart}.${end}`
}

export const formatLocaleNumber = (
  number: number | bigint,
  options = {} as { locale: string; maximumFractionDigits: number }
) => {
  const { locale = "zh-TW", maximumFractionDigits = 2 } = options

  return new Intl.NumberFormat(locale, { maximumFractionDigits }).format(number)
}

export const formatNumber = (value: number, digit = 2) => {
  return value.toFixed(digit)
}
