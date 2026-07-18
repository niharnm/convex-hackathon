const phoneDigits = /\d/g;

export function maskRecipient(recipient: string): string {
  const digits = recipient.match(phoneDigits)?.join("") ?? "";

  if (digits.length >= 2) {
    return `••• ••• ••${digits.slice(-2)}`;
  }

  if (recipient.includes("@")) {
    const domain = recipient.split("@")[1] ?? "hidden";
    return `•••@${domain}`;
  }

  return "••• redacted";
}

export function fingerprint(value: string): string {
  let hash = 2_166_136_261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16_777_619);
  }
  return Math.abs(hash >>> 0)
    .toString(36)
    .padStart(7, "0");
}
