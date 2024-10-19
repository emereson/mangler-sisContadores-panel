// Export normal
const formatFirstHour = (timeRange) => {
  const [startTime] = timeRange.split(" - ");
  return startTime;
};

export default formatFirstHour;
