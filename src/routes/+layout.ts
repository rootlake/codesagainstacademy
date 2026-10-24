// Real HTML files for every page. Without this, GitHub Pages serves the
// SPA shell as 404.html and Stripe rejects the site URL.
export const prerender = true;

// policies/index.html (not policies.html) so GitHub Pages returns 200.
export const trailingSlash = 'always';
