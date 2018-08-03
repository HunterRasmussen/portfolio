new Vue({

  el: '#root',

  data: {

    menu: 'MENU |',
    menuhover: 'MENU ||',
    menuDown: 'MENU X',
    menuShow: false,
    hoverMenu: false,
    showMenu: false,

    //firefly stuff
    canvas: '',
    maxFlies: 15,
    flyXSpeedRange: [-1,1],
    flyYSpeedRange: [-0.5,0.5],
    flySizeRange: [1,5],
    flyLifespanRange: [75,150],
    currentFlies: [],




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

      console.log(this.$refs);

    },

    getRandomRange: function(min,max){
        return Math.random() * (max - min) + min;
    },

    fly: function(options){
        if(!options){
          
        }
    },

    createFlies: function(){
      if(this.currentFlies.length < maxFlies){
        currentFlies.push(new fly());
      }
    }

  },

  mounted: function(){
      this.canvas = this.$refs.canvas;
  }







})
