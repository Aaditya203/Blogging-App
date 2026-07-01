import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateHeadingId(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function addHeadingIds(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("h1,h2,h3,h4").forEach((heading) => {
    heading.id = generateHeadingId(heading.textContent || "");
  });

  return doc.body.innerHTML;
}

export function extractHeadings(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return Array.from(
    doc.querySelectorAll("h1,h2,h3,h4")
  ).map((heading) => ({
    id: heading.id,
    text: heading.textContent || "",
    level: Number(heading.tagName[1]),
  }));
}
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}