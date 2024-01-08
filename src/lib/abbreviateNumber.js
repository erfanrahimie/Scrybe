export default function abbreviateNumber(number) {

  const num = Number(number);

  if (!num) return 0;

  if (num >= 1e9) {
    let formatted = (num / 1e9).toFixed(1);
    if (formatted.endsWith(".0")) formatted = formatted.split(".")[0]; 
    return formatted + "B";

  } else if (num >= 1e6) {
    let formatted = (num / 1e6).toFixed(1);
    if (formatted.endsWith(".0")) formatted = formatted.split(".")[0];
    return formatted + "M";
  
  } else if (num >= 1e3) {
    let formatted = (num / 1e3).toFixed(1);
    if (formatted.endsWith(".0")) formatted = formatted.split(".")[0];
    return formatted + "K";
  
  }

  return num;
}