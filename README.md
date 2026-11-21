# Prompt Haven

Free AI photo editing prompts for everyone. A plain static site, ready for GitHub and Cloudflare Pages. No build step, no database, no server code.

## What is in this site

- 30 guide posts, each with 10 original copy and paste prompts, a featured image, how to use steps, tips, common mistakes, FAQ with JSON-LD, and related guides.
- 5 category pages: Christmas, Couple, Family and Baby, Festive, Trending.
- 5 trust pages: About, Contact, Privacy Policy, Disclaimer, Terms.
- Homepage with search that filters the guide list, category cards, latest guides, how it works, FAQ, and an author strip.
- Shared `style.css` and `script.js`, clean light design, mobile friendly, system fonts only, no external fonts.
- SEO files: `sitemap.xml`, `robots.txt`, `_headers`, `llms.txt`.

## Dates

- 24 non Christmas guides: 1 October 2026 to 20 November 2026, 2 to 4 per week, no two on the same day.
- 6 Christmas and winter guides: 21 November 2026 to 5 December 2026, ready ahead of December.

## Images

- Featured image for each post: `images/<post-slug>.jpg`
- Author photo: `images/muhammad-afaq.jpg` (supplied by the site owner, used on About and the homepage author strip)
- All featured images are original illustrations made for Prompt Haven. No copied images.
- Image status: see `IMAGE_STATUS.md` after the image build. If a post image is missing, the page shows a clean gradient cover instead of a broken image, and the missing file is listed in `IMAGE_STATUS.md`.

## How to run it locally

```bash
cd prompt-haven
python3 -m http.server 8000
```

Then open http://localhost:8000/ in a browser.

## How to put it on GitHub

1. Create a new empty public repo on GitHub, for example `prompt-haven`.
2. In this folder, run:
```bash
git init
git add .
git commit -m "Launch Prompt Haven: 30 guides, trust pages, and SEO files"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/prompt-haven.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username.

## How to deploy on Cloudflare Pages

Option A, from GitHub:
1. In Cloudflare, go to Workers and Pages, then Create, then Pages, then Connect to Git.
2. Pick the `prompt-haven` repo.
3. Framework preset: None. Build command: leave blank. Build output directory: leave as `/` (the site root).
4. Deploy. Cloudflare will give you a `pages.dev` address.

Option B, direct upload:
1. In Cloudflare Pages, choose Upload assets.
2. Upload this whole folder.
3. Deploy.

After deploy, add your real domain in Cloudflare Pages under Custom domains, and update the site address in `sitemap.xml`, `robots.txt`, `llms.txt`, and the canonical links in the HTML files.

## Still needed from the site owner

- Real domain name. The site currently uses `prompt-haven.com` as a placeholder.
- Real contact email. The Contact page shows `hello@prompt-haven.com` as a clear placeholder.
- Real GA4 measurement ID, if analytics are wanted. No GA4 code is on the site yet.
- AdSense code only after approval. Do not add AdSense code before approval.
- More posts to reach 96, like the original site. This launch version has 30.

## Rules followed

- No em dash anywhere in any file.
- No copied text, prompts, or images from any other site.
- Simple human English, short sentences.
- No invented facts, no fake statistics, no fake testimonials, no fake AdSense approval claim.
- Prompts are free, and results vary by tool and photo.
