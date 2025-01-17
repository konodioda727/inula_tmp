/*
 * Copyright (c) 2023 Huawei Technologies Co.,Ltd.
 *
 * openInula is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 *          http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import { dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import resolve from 'resolve';
import crequire from 'crequire';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

function parse(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf-8');
  return (crequire(content) as any[])
    .map<string>(o => o.path)
    .filter(path => path.charAt(0) === '.')
    .map(path =>
      resolve.sync(path, {
        basedir: dirname(filePath),
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      })
    );
}

export function parseRequireDeps(filePath: string): string[] {
  const paths: string[] = [filePath];
  const ret: string[] = [filePath];

  while (paths.length) {
    const extraPaths = parse(paths.shift()!).filter(path => !ret.includes(path));
    if (extraPaths.length) {
      paths.push(...extraPaths);
      ret.push(...extraPaths);
    }
  }

  return ret;
}

export const isWindows = typeof process !== 'undefined' && process.platform === 'win32';

export function cleanRequireCache(cacheKey: string): void {
  const cachePath = isWindows ? cacheKey.replace(/\//g, '\\') : cacheKey;
  if (require.cache[cachePath]) {
    const cacheParent = (require.cache[cachePath] as any).parent;
    let i = cacheParent?.children.length || 0;
    while (i--) {
      if (cacheParent!.children[i].id === cachePath) {
        cacheParent!.children.splice(i, 1);
      }
    }
    delete require.cache[cachePath];
  }
}

export function copyFile(targetPath: string, sourcePath: string): void {
  try {
    const fileContent = readFileSync(sourcePath);
    writeFileSync(targetPath, fileContent);
  } catch (error) {
    console.error('Copy file failed.', error);
  }
}
