new Vue({

  el: '#root',

  data: {

    menu: 'MENU -',
    menuhover: 'MENU ||',
    hoverMenu: false,
    active: false,

  },

  methods: {
    turnMenuOn: function() {

      this.hoverMenu = true;
    },
    turnMenuOff: function() {
      this.hoverMenu = false;
    },
  }








})
