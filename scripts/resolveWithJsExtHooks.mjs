import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

async function resolveWithExt(base, context, nextResolve) {
  try {
    return await nextResolve(`${base}.js`, context);
  } catch {
    return nextResolve(`${base}.ts`, context);
  }
}

export async function resolve(specifier, context, nextResolve) {
  if (/\.(js|mjs|cjs|json|ts|tsx)$/.test(specifier)) {
    return nextResolve(specifier, context);
  }
  if (specifier.startsWith('@/')) {
    const abs = pathToFileURL(path.join(root, specifier.slice(2))).href;
    return resolveWithExt(abs, context, nextResolve);
  }
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    return resolveWithExt(specifier, context, nextResolve);
  }
  return nextResolve(specifier, context);
}
