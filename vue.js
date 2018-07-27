new Vue({

  el: '#root',

  data: {

    menu: 'MENU -',
    menuhover: 'MENU ||',
    hoverMenu: false,
    active: false,

  },

  methods: {
    mouseOver: function() {
      //this.menu = 'MENU |';
      this.hoverMenu = !this.hoverMenu;
    }
  }








})
