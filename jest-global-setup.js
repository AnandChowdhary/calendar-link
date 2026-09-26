module.exports = async () => {
  process.env.TZ = process.env.CALENDAR_LINK_TEST_TZ || "UTC";
};
