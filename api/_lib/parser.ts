import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, date, md } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }

    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        date: typeof date === "string" ? date : 'Dec 28, 2021',
        // images: getArray(images),
        // widths: getArray(widths),
        // heights: getArray(heights),
    };
    // parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);
    return parsedRequest;
}

// function getArray(stringOrArray: string[] | string | undefined): string[] {
//     if (typeof stringOrArray === 'undefined') {
//         return [];
//     } else if (Array.isArray(stringOrArray)) {
//         return stringOrArray;
//     } else {
//         return [stringOrArray];
//     }
// }

// function getDefaultImages(images: string[], theme: Theme): string[] {
//     const defaultImage = theme === 'light'
//         ? 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg'
//         : 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg';

//     if (!images || !images[0]) {
//         return [defaultImage];
//     }
//     if (!images[0].startsWith('https://assets.vercel.com/') && !images[0].startsWith('https://assets.zeit.co/')) {
//         images[0] = defaultImage;
//     }
//     return images;
// }
