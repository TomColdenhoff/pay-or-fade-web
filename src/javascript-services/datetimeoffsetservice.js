export function fromUTCToCurrentDate(utcDate) {
  let minutesFromUTC = new Date().getTimezoneOffset();
  let utcDateObj = new Date(utcDate.split("+")[0]);
  return new Date(utcDateObj.getTime() + -minutesFromUTC * 60000);
}
