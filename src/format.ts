// Show two decimal places, except for whole numbers (including ones that round to whole).
export const format = (n: number) => {
  const rounded = Number(n.toFixed(2));
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
};
