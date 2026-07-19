/**
 * basePath für statisches Hosting unter einem Unterpfad (GitHub Pages).
 * next/image prefixt src bei `images.unoptimized` nicht automatisch —
 * daher überall dort, wo Assets aus public/ referenziert werden, via
 * withBasePath() auflösen. Lokal (kein NEXT_PUBLIC_BASE_PATH) ein No-op.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string): string {
  return `${basePath}${src}`;
}
