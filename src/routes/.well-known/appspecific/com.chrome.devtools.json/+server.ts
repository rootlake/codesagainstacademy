import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({}), {
        headers: {
            'content-type': 'application/json'
        }
    });
}; 