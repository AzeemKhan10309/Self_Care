export const startOfDay = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const endOfDay = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};

export const atTime = (base: Date, hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const dt = new Date(base);
  dt.setHours(h ?? 0, m ?? 0, 0, 0);
  return dt;
};
