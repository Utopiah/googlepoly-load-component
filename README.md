# googlepoly-load-component

Live demo at https://gpoly.glitch.me/

See Google Poly documentation at https://developers.google.com/poly/develop/web

Optionally you can load via URL using the gpolyid parameter.

```html
  <script src="https://aframe.io/releases/0.7.1/aframe.min.js"></script>
  <script src="https://rawgit.com/Utopiah/googlepoly-load-component/master/googlepoly-load-component.js"></script>

  <!-- ... -->

  <!-- That expensive chair by Vladimir Iiirc aka VR_Human : https://poly.google.com/view/5osCtu2pLwv -->
  <!-- make sure to use your API key if you remix this glitch -->
  <a-entity position="0 0.5 -5" gpoly="polyid:5osCtu2pLwv; API_KEY:;"></a-entity>

```
