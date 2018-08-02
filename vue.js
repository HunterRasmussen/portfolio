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
        this.$refs.mainLogo.id = "logo";
        this.$refs.menuItems.id = "notMenuItems";
      }
      else{
        this.$refs.myMenu.id = "menuDropDown";
        this.$refs.mainLogo.id = "logoWithMenu";
        this.$refs.menuItems.id = "menuItems";
      }

      console.log(this.$refs.myMenu.id)

    },

  }








})
