const randomColor = (): string => {
  return "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
};

const isColorDarkOrLight = (color: string): string => {
  const hex = color.substring(1);

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 2), 16);

  console.log(r, g, b);

  let luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 186 ? "#000" : "#fff";
};

export const getProfileColor = () => {
  const backgroundColor = randomColor();
  const color = isColorDarkOrLight(backgroundColor);
  return { backgroundColor, color };
};
