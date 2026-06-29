const MAX_PHOTOS_PER_PROJECT = 30;

export function getLocalImagePaths(projectId: number | undefined): string[] {
  if (!projectId || projectId <= 0) return [];
  const base = __BASE_PATH__ || '/';
  return Array.from(
    { length: MAX_PHOTOS_PER_PROJECT },
    (_, i) => `${base}projects/${projectId}/${i + 1}.jpg`
  );
}