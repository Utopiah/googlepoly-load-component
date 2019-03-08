AFRAME.registerComponent('gpoly', {
  schema: {
    polyid: { default: '5vbJ5vildOq' },
    API_KEY: { default: '' }
  },
  init: function () {
    var id = this.data.polyid;
    var polyid = AFRAME.utils.getUrlParameter('polyid');
    if (polyid.length > 0) id = polyid;

    let API_KEY = this.data.API_KEY;
    let url = "https://poly.googleapis.com/v1/assets/" + id + "/?key=" + API_KEY;
    let el = this.el;

    if (!API_KEY) {
      console.log('Please fill in your API KEY, cf https://developers.google.com/poly/develop/web ')
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        const gltf2Format = data.formats.find((f) => f.formatType === "GLTF2")
        if (gltf2Format) { // Use <a-gltf-model> if GLTF2 format is available
          el.setAttribute("gltf-model", gltf2Format.root.url);
        } else {
          const objFormat = data.formats.find((f) => f.formatType === "OBJ")
          if (objFormat) { // Use <a-obj-model> if OBJ format is available
            el.setAttribute("obj-model", "obj", objFormat.root.url);
            el.setAttribute("obj-model", "mtl", objFormat.resources[0].url);
          }
        }
      })
      .catch(err => { throw err });
  }
});