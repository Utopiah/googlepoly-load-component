
AFRAME.registerComponent('gpoly-search', {
  schema: {
    keywords: {default: 'chair'},
    API_KEY: {default: ''}
  },
  init: function () {
    var keywords = this.data.keywords;
    var keywordsparam = AFRAME.utils.getUrlParameter('keywords');
    if (keywordsparam.length > 0) keywords = keywordsparam;
    
    let API_KEY = this.data.API_KEY;
    var url = `https://poly.googleapis.com/v1/assets?keywords=${keywords}&format=OBJ&key=${API_KEY}`;
    let el = this.el;

    if (!API_KEY){
      console.log('Please fill in your API KEY, cf https://developers.google.com/poly/develop/web ')
      return;
    }
    
    fetch(url)
    .then(res => res.json())
    .then((out) => {
      var id = out.assets[0].name.replace("assets/","") ;
      var entity = document.createElement("a-entity");
      entity.setAttribute("gpoly", "polyid", id);
      entity.setAttribute("gpoly", "API_KEY", API_KEY);
      el.appendChild(entity);
    })
    .catch(err => { throw err });
  }
});
