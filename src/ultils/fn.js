export const generatePath = (value) => {
    if (!value) return
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
        .replace('đ', 'd')
}

export function numFormatter(num) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(num); // if value < 1000, nothing to do
  }