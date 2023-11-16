/* eslint-disable no-useless-escape */

export const checkValidEmail = (email) => {
  return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(email)
}

export const checkValidPassword = (password) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
}

export const checkValidPhoneNumber = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber)
}