const getUserColor = (userId: string): string => {
  const [_, id] = userId.split(":");
  const hexChar = id.substring(0, 6).split("");
  const hex = hexChar.map((h) => (h.charCodeAt(0) % 16).toString(16));
  return `#${hex.join("")}`;
};

const isColorDarkOrLight = (color: string): string => {
  const hex = color.substring(1);

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 2), 16);

  let luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186 ? "#000" : "#fff";
};

export const getProfileColor = (userId: string) => {
  const backgroundColor = getUserColor(userId);
  const color = isColorDarkOrLight(backgroundColor);
  return { backgroundColor, color };
};
