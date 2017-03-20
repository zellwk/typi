WebFont.load({
  google: {
    families: ["Source Sans Pro:100,300,400,500,700"]
  },
  loading: function() {
    capHeight.setContainer(document.body);
  },

  fontactive: capHeight.fontActive(function(properties) {
    console.log(properties);
  })
});
