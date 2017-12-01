AFRAME.registerComponent('gpoly', {
  schema: {
    polyid: {default: '5vbJ5vildOq'},
    API_KEY: {default: ''}
  },
  init: function () {
    var id = this.data.polyid;
    var polyid = AFRAME.utils.getUrlParameter('polyid');
    if (polyid.length > 0) id = polyid;
    
    let API_KEY = this.data.API_KEY;
    let url = "https://poly.googleapis.com/v1/assets/"+id+"/?key="+API_KEY;
    let el = this.el;

    if (!API_KEY){
      console.log('Please fill in your API KEY, cf https://developers.google.com/poly/develop/web ')
      return;
    }
    
    fetch(url)
    .then(res => res.json())
    .then((out) => {
      var model = out.formats[0].root.url;
      var materials = out.formats[0].resources[0].url;
      // using ob+mtl since glTF format is not 2.0 
      el.setAttribute("obj-model", "obj", model );
      el.setAttribute("obj-model", "mtl", materials );
    })
    .catch(err => { throw err });
  }
});
