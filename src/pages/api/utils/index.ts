// Import day.js
import dayjs from "dayjs";
import "dayjs/locale/ko";

// Function to get the current month label and percent of the month passed

export function getCurrentMonthInfoWithPercent() {
  // Set the locale to Korean
  dayjs.locale("ko");

  // Get the current date
  const now = dayjs();

  // Get the current month label in Korean
  const monthLabel = now.format("MMMM"); // e.g., "7월"

  // Get the current day of the month
  const currentDay = now.date();

  // Get the total number of days in the current month
  const totalDaysInMonth = now.daysInMonth();

  // Calculate the percentage of the month passed
  const percentPassed = ((currentDay / totalDaysInMonth) * 100).toFixed(2);

  // Return the result as an object
  return {
    label: monthLabel,
    percent: parseFloat(percentPassed),
  };
}
