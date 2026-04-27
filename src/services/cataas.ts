const BASE_URL = 'https://cataas.com';

export type ImageType = 'small' | 'medium' | 'square' | 'original';
export type ImageFilter = 'mono' | 'negate' | 'flip' | 'sepia' | 'paint' | 'pixel' | 'grid' | 'matrix';
export type TextPosition = 'top' | 'center' | 'bottom';

export interface Cat {
  id: string;
  tags: string[];
  mimetype: string;
  createdAt: string;
}

export interface CatWithUrl extends Cat {
  url: string;
}

export interface ImageOptions {
  type?: ImageType;
  filter?: ImageFilter;
  width?: number;
  height?: number;
  blur?: number;
  brightness?: number;
  saturation?: number;
}

export interface TextOptions {
  fontSize?: number;
  fontColor?: string;
  textPosition?: TextPosition;
}

export interface ListCatsOptions {
  tags?: string[];
  limit?: number;
  skip?: number;
}

function buildImageUrl(
  path: string,
  imageOptions?: ImageOptions,
  textOptions?: TextOptions,
): string {
  const params = new URLSearchParams();

  if (imageOptions?.type) params.set('type', imageOptions.type);
  if (imageOptions?.filter) params.set('filter', imageOptions.filter);
  if (imageOptions?.width != null) params.set('width', String(imageOptions.width));
  if (imageOptions?.height != null) params.set('height', String(imageOptions.height));
  if (imageOptions?.blur != null) params.set('blur', String(imageOptions.blur));
  if (imageOptions?.brightness != null) params.set('brightness', String(imageOptions.brightness));
  if (imageOptions?.saturation != null) params.set('saturation', String(imageOptions.saturation));

  if (textOptions?.fontSize != null) params.set('fontSize', String(textOptions.fontSize));
  if (textOptions?.fontColor) params.set('fontColor', textOptions.fontColor);
  if (textOptions?.textPosition) params.set('textPosition', textOptions.textPosition);

  const query = params.toString();
  return `${BASE_URL}${path}${query ? `?${query}` : ''}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Cataas request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

/** Get a list of cats, optionally filtered by tags. */
export function listCats(options: ListCatsOptions = {}): Promise<Cat[]> {
  const params = new URLSearchParams();
  if (options.tags?.length) params.set('tags', options.tags.join(','));
  if (options.limit != null) params.set('limit', String(options.limit));
  if (options.skip != null) params.set('skip', String(options.skip));

  const query = params.toString();
  return fetchJson<Cat[]>(`${BASE_URL}/api/cats${query ? `?${query}` : ''}`);
}

/** Get all available tags. */
export function listTags(): Promise<string[]> {
  return fetchJson<string[]>(`${BASE_URL}/api/tags`);
}

/** Get a random cat's metadata. */
export function getRandomCat(imageOptions?: ImageOptions): Promise<CatWithUrl> {
  const params = new URLSearchParams({ json: 'true' });
  if (imageOptions?.type) params.set('type', imageOptions.type);
  if (imageOptions?.filter) params.set('filter', imageOptions.filter);
  return fetchJson<CatWithUrl>(`${BASE_URL}/cat?${params}`);
}

/** Get a cat's metadata by ID. */
export function getCatById(id: string): Promise<CatWithUrl> {
  return fetchJson<CatWithUrl>(`${BASE_URL}/cat/${encodeURIComponent(id)}?json=true`);
}

/** Build the URL for a random cat image. */
export function randomCatUrl(imageOptions?: ImageOptions): string {
  return buildImageUrl('/cat', imageOptions);
}

/** Build the URL for a cat image by ID. */
export function catByIdUrl(id: string, imageOptions?: ImageOptions): string {
  return buildImageUrl(`/cat/${encodeURIComponent(id)}`, imageOptions);
}

/** Build the URL for a random cat image by tag. */
export function catByTagUrl(tag: string, imageOptions?: ImageOptions): string {
  return buildImageUrl(`/cat/${encodeURIComponent(tag)}`, imageOptions);
}

/** Build the URL for a random cat image with a text overlay. */
export function catWithTextUrl(
  text: string,
  imageOptions?: ImageOptions,
  textOptions?: TextOptions,
): string {
  return buildImageUrl(`/cat/says/${encodeURIComponent(text)}`, imageOptions, textOptions);
}

/** Build the URL for a cat image by tag with a text overlay. */
export function catByTagWithTextUrl(
  tag: string,
  text: string,
  imageOptions?: ImageOptions,
  textOptions?: TextOptions,
): string {
  return buildImageUrl(
    `/cat/${encodeURIComponent(tag)}/says/${encodeURIComponent(text)}`,
    imageOptions,
    textOptions,
  );
}
