export const TimeFormats = {
  dateTimeWithOffset: "YYYY-MM-DD[T]HH:mm:ssZ",
  dateTimeUTC: "YYYYMMDD[T]HHmmss[Z]",
  allDay: "YYYYMMDD",
};

export const wrapHttpUrlInAnchorTag = (body?: string) => {
  if(!body) return;
  return body.split(' ').map(word => (isValidHttpUrl(word)?`<a href='${word}'>${word}</a>`:word)).join(' ');
}

const isValidHttpUrl = (word: string) => {
let url;

try {
  url = new URL(word);
} catch (_) {
  return false;  
}

return url.protocol === "http:" || url.protocol === "https:";
}
