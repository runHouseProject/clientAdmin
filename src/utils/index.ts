export function getTodayDate() {
  const today = new Date();
  const utcDate = today.getTime() + today.getTimezoneOffset() * 6000; // UTC 시간으로 변환
  const koreaTimeOffset = 9 * 60 * 60 * 1000; // 한국 시간 오프셋 (UTC+9)
  const koreaDate = new Date(utcDate + koreaTimeOffset);
  const date = koreaDate.toISOString().split("T")[0];
  return date;
}
