// Prepara un DOM mínimo y registra los bloques de WordPress para usarlos en Node.
import { JSDOM } from 'jsdom';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
for (const k of ['Node', 'HTMLElement', 'Element', 'DOMParser', 'MutationObserver', 'getComputedStyle', 'CSS']) globalThis[k] ??= dom.window[k];
dom.window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
globalThis.matchMedia = dom.window.matchMedia;
globalThis.requestAnimationFrame = (f) => setTimeout(f, 0);
// Silencia avisos internos de React que no afectan al resultado.
const warn = console.warn; const error = console.error;
console.warn = (...a) => { if (!String(a[0]).includes('memo')) warn(...a); };
console.error = (...a) => { if (!String(a[0]).includes('memo')) error(...a); };
const { registerCoreBlocks } = require('@wordpress/block-library');
export const blocks = require('@wordpress/blocks');
registerCoreBlocks();
