export const getDonorBadge = (count) => {
  if (count === undefined || count === null) return null;
  if (count >= 5) return { icon: "💛", text: "Golden Heart", color: "#FFD700" };
  if (count >= 3) return { icon: "🛡️", text: "Silver Shield", color: "#C0C0C0" };
  if (count >= 1) return { icon: "🩸", text: "Bronze Drop", color: "#CD7F32" };
  return null;
};
