const urlPattern = /https?:\/\/[^\s,"'<>]+|(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s,"'<>]*)?/gi;

export function normalizeUrl(value: string) {
  const trimmed = value.trim().replace(/[).,;]+$/, "");

  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function parseUrls(text: string) {
  const matches = text.match(urlPattern) ?? [];
  const urls = matches.map((match) => normalizeUrl(match)).filter((url): url is string => Boolean(url));

  return Array.from(new Set(urls));
}

export async function parseUrlFiles(files: FileList | File[]) {
  const fileArray = Array.from(files);
  const text = await Promise.all(
    fileArray
      .filter((file) => {
        const name = file.name.toLowerCase();
        return name.endsWith(".txt") || name.endsWith(".csv") || file.type.startsWith("text/");
      })
      .map((file) => file.text()),
  );

  return parseUrls(text.join("\n"));
}
