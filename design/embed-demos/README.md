# Map embed demos (prompt 25 §3), not published

Three placeholder pages that show the embed snippet in use. The brands are invented ("Jornal Exemplo", "Example Developer", "Banco Exemplo"). The developer and bank demos are in English (D51); being private, the developer demo keeps a 5 M€ example (D52). They load the map from the branch preview; open them locally in a browser.

Snippet (any site):

```html
<div data-imoveis-map data-lang="pt" data-budget="500000" data-center="-8.61,41.15,9" data-pin="-8.61,41.15,Residências do Rio"
     data-cta="https://example.com/contact" data-cta-label="Pedir informação" data-accent="#003b5c" data-height="720"></div>
<script src="https://imoveisportugal.lu/embed/map.js" async></script>
```

Options: `lang` (pt, en, fr), `budget` (euros), `metric` (m2, price, growth, yield), `center` (lon,lat,zoom), `pin` (lon,lat,label: a highlighted project), `cta` and `cta-label` (the button on every place card; http or https only), `accent` (#rrggbb, the partner's colour), `height` (px).
Without a script: `<iframe src="https://imoveisportugal.lu/embed/map/pt/?budget=500000&center=-8.61,41.15,9" style="width:100%;height:760px;border:0" loading="lazy"></iframe>`.

The footer of every embed shows only "Powered by Imóveis Portugal" (linked) and "Fonte: INE · © OpenStreetMap contributors". Licensing terms and prices are not set (D9 and task 8y: whether agencies may license it is undecided).
