module.exports = async () => {
  // do NOT use UTC here, so that we can properly test toUtc logic
  process.env.TZ = "Europe/Copenhagen";
};
