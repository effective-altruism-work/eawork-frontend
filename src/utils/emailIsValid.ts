// https://ui.dev/validate-email-address-javascript

export default function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
