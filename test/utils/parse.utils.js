export function parseVoteCount(text) {
  const cleaned = text.replace(/[()]/g, "").trim();
  
  if (cleaned.includes("M")) {
    return parseFloat(cleaned.replace("M", "")) * 1_000_000;
  }
  if (cleaned.includes("K")) {
    return parseFloat(cleaned.replace("K", "")) * 1_000;
  }
  return parseInt(cleaned);
}
