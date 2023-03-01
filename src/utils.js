import { globbySync } from "globby";

export function expandedFiles(files) {
  const containsGlob = files.some((file) => file.includes("*"));

  return containsGlob ? globbySync(files) : files;
}
