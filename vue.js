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
      if(this.$refs.myMenu.id == "menuDropDown"){
        this.$refs.myMenu.id = "menuHidden";
      }
      else{
        this.$refs.myMenu.id = "menuDropDown";
      }
      console.log(this.$refs.myMenu.id)

    },

  }








})
