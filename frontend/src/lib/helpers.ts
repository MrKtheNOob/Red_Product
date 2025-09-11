export const BASE_URL="http://192.168.48.42:8000"

// read CSRF token from cookie
export function getCsrfToken() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : "";
};