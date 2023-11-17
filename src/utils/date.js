import { MONTHS } from "./constants"


export const formatDDMMMYYYFromISOString = (isoDateString) => {
  const dateObject = new Date(isoDateString)
  const day = dateObject.getDate()
  const month = MONTHS[dateObject.getMonth()]
  const year = dateObject.getFullYear()

  return `${zeroPadding(day)} ${month} ${year}`
}

export const zeroPadding = (number) => ('0' + number).slice(-2)
