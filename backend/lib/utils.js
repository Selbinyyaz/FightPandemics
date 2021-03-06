const moment = require("moment");

const generateUUID = ({ range }) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  // eslint-disable-next-line no-plusplus
  for (let i = range; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const dateToEpoch = (date) => Math.round(date.getTime() / 1000);

// eslint-disable-next-line eqeqeq
const bool = (env) => env == "true";

const getCookieToken = (req) => req.cookies.token;

const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const isValidEmail = (email) => emailRegEx.test(email);

const relativeTimeObject = (number, unit) => ({
  count: number,
  unit: unit,
});

const translateISOtoRelativeTime = (ISODate) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: (number) => relativeTimeObject(number, "second"),
      ss: (number) => relativeTimeObject(number, "second"),
      m: (number) => relativeTimeObject(number, "minute"),
      mm: (number) => relativeTimeObject(number, "minute"),
      h: (number) => relativeTimeObject(number, "hour"),
      hh: (number) => relativeTimeObject(number, "hour"),
      d: (number) => relativeTimeObject(number, "day"),
      dd: (number) => relativeTimeObject(number, "day"),
      w: (number) => relativeTimeObject(number, "week"),
      ww: (number) => relativeTimeObject(number, "week"),
      M: (number) => relativeTimeObject(number, "month"),
      MM: (number) => relativeTimeObject(number, "month"),
      y: (number) => relativeTimeObject(number, "year"),
      yy: (number) => relativeTimeObject(number, "year"),
    },
  });

  return moment(ISODate).fromNow(true);
};

const setElapsedTimeText = (createdAt, updatedAt) => {
  return {
    created: translateISOtoRelativeTime(createdAt),
    isEdited: createdAt < updatedAt,
  };
};

const createSearchRegex = (keywords) => {
  let cleanKeywords = keywords.replace(/[.*+?^${}()|[\]\\\.]/g, "\\$&");
  let isLatin = /^[a-zA-Z .*+?^${}()|[\]\\\.]+$/.test(cleanKeywords);
  const keywordsRegex = new RegExp(
    cleanKeywords
      .split(/[ \/,=$%#()-]/gi)
      .filter((key) => key && key.length > 1)
      .map((key) =>
        isLatin && key.length <= 3
          ? "\\b" + key + "\\b"
          : isLatin
          ? "\\b" + key
          : key,
      )
      .join("|") || "\\b\\B",
    "ig",
  );
  return keywordsRegex;
}

module.exports = {
  bool,
  dateToEpoch,
  generateUUID,
  getCookieToken,
  isValidEmail,
  createSearchRegex,
  setElapsedTimeText,
};
