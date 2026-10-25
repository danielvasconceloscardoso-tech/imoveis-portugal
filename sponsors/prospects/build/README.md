# Partner Prospect Book: source

- `data.py`: the firms, grouped by product (area placements, journey checkpoints, Private), with evidence, websites and D40 prices.
- `gen.py`: builds `book.html`; `style.css`: the design.
- Fonts: copy Newsreader (opsz) and Public Sans 400/600 woff2 files from `site/node_modules/@fontsource*` into this folder before building.
- Render to PDF with Playwright (`page.pdf(format="A4", print_background=True, prefer_css_page_size=True)`), output to `../Partner_Prospects_YYYY-MM.pdf`.
