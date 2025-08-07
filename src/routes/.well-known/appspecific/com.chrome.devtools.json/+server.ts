import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({}), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
