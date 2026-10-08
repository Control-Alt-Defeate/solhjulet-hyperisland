# Solhjulet – website redesign

A student concept redesign of the website for **BRF Solhjulet**, built by the
Control-Alt-Defeate team at Hyper Island (FED28, brief "The Freelance Test").

> Student concept project by Faryal, Masal, Emanuel and Filip, Hyper Island.
> Not affiliated with BRF Solhjulet.

- **Live site:** _to be added (GitHub Pages)_
- **Repository:** [github.com/Control-Alt-Defeate/solhjulet-hyperisland](https://github.com/Control-Alt-Defeate/solhjulet-hyperisland)


## The business

BRF Solhjulet is a housing association in Edsberg, Sollentuna, with 701
apartments. Its current website is [solhjulet.se](https://solhjulet.se/).

The existing site has useful information for residents, but it is spread over
many sections. Things residents need often, such as parking, facilities, fault
reporting and contact details, are hard to find quickly.

### Problems this redesign solves

1. **Finding important information takes too long.** Clearer navigation and
   page structure get residents to what they need in fewer clicks.
2. **Important resident services aren't prioritised.** Key services are moved
   up the information hierarchy.
3. **The website feels content-heavy.** Content is split into focused pages
   with short, scannable sections.


## Pages

Every page shares the same navigation and footer, and the current page is
marked in the nav. Both are built by `js/layout.js` (see below).

| Page | File | Status |
| --- | --- | --- |
| Home | `index.html` | Hero done |
| For Residents | `pages/for_residents.html` | Content to be added |
| Facilities & Services | `pages/facilities_services.html` | Built |
| News & Updates | `pages/news_updates.html` | Built |
| About Solhjulet | `pages/about.html` | Built, includes contact details |
| Page not found | `pages/404.html` | Built |


## Project structure

```text
solhjulet-hyperisland/
├── index.html                  Home page
├── index.css                   Shared styles: colours, fonts, nav, footer, home
├── js/
│   └── layout.js               Shared nav and footer for every page
├── assets/                     Logo and images
└── pages/
    ├── for_residents.html
    ├── facilities_services.html + .css
    ├── news_updates.html + .css + .js (category filter)
    ├── about.html + .css
    └── 404.html + .css
```

### Shared nav and footer

The nav and footer are written once, in `js/layout.js`. Each page only has two
placeholders and loads the script at the end of `<body>`:

```html
<div data-site-nav></div>
<!-- page content -->
<div data-site-footer></div>

<script src="../js/layout.js"></script>
```

The script:

- replaces the placeholders with the nav and footer markup,
- builds every link from the site root, so links work from `index.html` and
  from pages inside `pages/`,
- adds `aria-current="page"` to the link for the page you are on, which
  underlines it in the nav.

The home page uses `<div data-site-nav="home"></div>` inside the hero to get
the transparent hero navbar.

- **Shared styles** live in `index.css`. Colours, font sizes and button sizes
  are CSS custom properties in `:root`, so the whole site can be re-themed in
  one place.
- **Page-specific styles** go in their own file next to the page (for
  example `pages/news_updates.css`), loaded after `index.css`.
- **Paths:** pages in the project root link to `index.css` and `assets/...`.
  Pages inside `pages/` need `../` in front, for example `../index.css` and
  `../assets/logo.png`.


## How to update the site

### Run it locally

No build step is needed. Open `index.html` in a browser, or run a small local
server from the project folder:

```bash
python3 -m http.server 8000
```

Then go to `http://localhost:8000`.

### Add a news item

In `pages/news_updates.html`, copy one `<article class="news-card">` block
inside `<div class="news-list">` and change:

- `data-category`: one of `events`, `community` or `important`. This decides
  which filter tab shows the card.
- `aria-labelledby` and the heading `id`: give them a new, unique value.
- The image `src` and `alt`. Describe the photo in the `alt` text.
- The title, the text, and the hidden text inside the "View" link (use the
  same words as the title).

### Add an image

- Put it in `assets/`. Use your own photos or free stock images (for example
  from Unsplash), never the association's own photos.
- Resize it before adding it. Card images are shown small, so around 800px on
  the longest side is enough. On macOS: `sips -Z 800 assets/your-image.jpg`.
- Always write `alt` text. If the image is only decoration, use `alt=""`.

### Add a new page

1. Create the page in `pages/` and add the two placeholders and the
   `<script src="../js/layout.js"></script>` line shown above.
2. Link the shared styles with `../index.css`, then your page's own CSS.
3. To show the page in the nav and footer, add it to the `pages` list at the
   top of `js/layout.js`. This updates every page at once.
4. Keep `<meta name="robots" content="noindex">` in the `<head>`.

To change a nav or footer link or text, edit `js/layout.js` only.


## Accessibility

We aim for a Lighthouse accessibility score of 90 or higher. Current
practices:

- Semantic HTML: `header`, `nav`, `main`, `article` and `footer`, with one
  `h1` per page.
- Alt text on every meaningful image.
- Everything works with the keyboard, with visible focus outlines. The News
  page has a "Skip to main content" link.
- Text colours on the News page checked for contrast (at least 4.5:1). The
  other pages still need checking.
- The filter tabs tell screen readers which tab is selected and announce how
  many news items are shown.


## How we used AI

- Every commit is tagged `[manual]` or `[ai]`.
- The foundation was built by hand: colour and typography variables, layout,
  nav, footer and the Home page.
- AI (Cursor) was used for the News & Updates page: the page layout and
  styles, the category filter script, accessibility improvements and the news
  cards.
- Each AI use is logged in `ai-log.md` with the prompt, what it produced, and
  what we kept, changed or threw away.

_The AI log is to be added._


## JS wishlist

Things the site needs that HTML and CSS can't do alone. This list is the
starting point for the JavaScript course.

- [x] Filter news by category (done in `pages/news_updates.js`)
- [x] Shared nav and footer with the current page marked (done in
  `js/layout.js`)
- [ ] Working login for residents
- [ ] Open a full news article from the "View" button
- _More to be added_


## Testing

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] At least one real phone
- [ ] Works at 320px, tablet and desktop without horizontal scrolling
- [ ] Lighthouse accessibility score of 90 or higher


## To do before handover

- [ ] Publish on GitHub Pages and add the live link above
- [ ] Build the Facilities & Services, About and Contact pages
- [ ] Add content to the For Residents page
- [ ] Update the footer on every page with the student concept disclaimer
- [ ] Add `ai-log.md`
- [ ] Mark any demo forms clearly as a demo


## Team

Control-Alt-Defeate: Faryal, Masal, Emanuel, Filip
