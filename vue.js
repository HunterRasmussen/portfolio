new Vue({

  el: '#root',

  data: {

    menu: 'MENU |',
    menuhover: 'MENU ||',
    menuDown: 'MENU X',
    menuShow: false,
    hoverMenu: false,
    showMenu: false,

  },

  methods: {
    showMenuFunction: function() {
      this.showMenu = !this.showMenu;
      this.hoverMenu = false;
      console.log(this.$refs.myMenu)
      this.$refs.myMenu.id = "menuDropDown";

    },

  }








})
