export const requestDraftStorageKey = "vun-request-draft-v1";

export interface RequestDraft {
  need: string;
  postalCode: string;
  version: 1;
}

export function parseRequestDraft(value: string | null): RequestDraft | null {
  if (!value) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }

    throw error;
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("version" in parsed) ||
    parsed.version !== 1 ||
    !("need" in parsed) ||
    typeof parsed.need !== "string" ||
    !("postalCode" in parsed) ||
    typeof parsed.postalCode !== "string"
  ) {
    return null;
  }

  return {
    need: parsed.need,
    postalCode: parsed.postalCode,
    version: 1,
  };
}
