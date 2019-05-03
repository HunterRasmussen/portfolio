new Vue({

  el: '#root',

  data: {

    pageLoaded: 'false',
    menu: 'MENU |',
    menuhover: 'MENU ||',
    menuDown: 'MENU X',
    menuShow: false,
    hoverMenu: false,
    showMenu: false,
    artworkListItemHover: false,

    //firefly stuff
    context: '',
    canvas: '',
    canvasWidth: '',
    canvasHeight: '',
    maxFlies: 20,
    flyXSpeedRange: [0,.5],
    flyYSpeedRange: [-0.25,0.25],
    flySizeRange: [5,60],
    flyLifespanRange: [75,450],
    currentFlies: [ ], //array of fly objects
    timer: '',




  },

  methods: {
    showMenuFunction: function() {
      this.showMenu = !this.showMenu;
      this.hoverMenu = false;
      if(this.$refs.myMenu.id == "menuDropDown"){
        this.$refs.myMenu.id = "menuHidden";
        this.$refs.mainLogo.id = "logo";
        this.$refs.menuItems.id = "notMenuItems";
        this.$refs.myName.id = "myName";
      }
      else{
        this.$refs.myMenu.id = "menuDropDown";
        this.$refs.mainLogo.id = "logoWithMenu";
        this.$refs.menuItems.id = "menuItems";
        this.$refs.myName.id = "myNameWithMenu";
      }

      console.log(this.$refs);

    },

    getRandomRange: function(min,max){
        return Math.random() * (max - min) + min;
    },

    fly: function(flyObject, options){
        if(!options){
          flyObject.x = this.getRandomRange(0,this.canvasWidth);
          flyObject.y = this.getRandomRange(0,this.canvasHeight);
          flyObject.speedX = this.getRandomRange(this.flyXSpeedRange[0],this.flyXSpeedRange[1]);
          flyObject.speedY = this.getRandomRange(this.flyYSpeedRange[0],this.flyYSpeedRange[1]);
          flyObject.size = this.getRandomRange(this.flySizeRange[0], this.flySizeRange[1]);
          flyObject.lifeSpan = this.getRandomRange(this.flyLifespanRange[0], this.flyLifespanRange[1]);
          flyObject.age = 0;
          flyObject.color = {red: 255, green: 255, blue: 255, alpha: 0};
        }
        else{
          flyObject.x = options.x;
          flyObject.y = options.y;
          flyObject.speedX = options.speedX;
          flyObject.speedY = options.speedY;
          flyObject.size = options.size;
          flyObject.lifeSpan = options.lifeSpan;
          flyObject.age = 0;
          flyObject.color = options.color;
        }
    },

    createFlies: function(){
      while(this.currentFlies.length < this.maxFlies){
        var temp = {};
        this.fly(temp, null);
        this.currentFlies.push(temp);
      }
    },

    clearScreen: function() {
      this.context.beginPath();
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.fillStyle = 'rgba(255, 255, 255, .0)';
      this.context.rect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.fill();
    },

    moveFlies: function() {
        this.currentFlies.forEach(function(fly){
          fly.x += fly.speedX;
          fly.y += fly.speedY;
          fly.age++;

          if(fly.age < fly.lifeSpan/2){
            fly.color.alpha+= 1 / (fly.lifeSpan/2);
            if(fly.color.alpha > 1){ //fix opacity
              fly.color.alpha = 1;
            }
          }
          else{
              fly.color.alpha -= 1 / (fly.lifeSpan / 2);
               if (fly.color.alpha < 0) { //fix opacity.
                  fly.color.alpha = 0;
                }
          }
        })
    },

    removeFlies: function() {
      var i = this.currentFlies.length;
      while (i--) {
        var fly = this.currentFlies[i];
        if (fly.age >= fly.lifeSpan) {
          this.currentFlies.splice(i, 1);
        }
      }
    },

    drawFlies: function() {
      for(i = 0; i < this.currentFlies.length; i++){
        this.context.beginPath();
        console.log(this.currentFlies[i]);
        this.context.fillStyle = 'rgba(' + this.currentFlies[i].color.red + ', '
            + this.currentFlies[i].color.green + ', '
            + this.currentFlies[i].color.blue + ', '
             + this.currentFlies[i].color.alpha + ')';
        this.context.arc( this.currentFlies[i].x, this.currentFlies[i].y,
                          this.currentFlies[i].size, 0, Math.PI * 2, false );
        console.log(this.context.arc);
        this.context.fill();
      }
    },

    renderFliesAnimation: function(){
      this.clearScreen();
      this.createFlies();
      this.moveFlies();
      this.removeFlies();
      this.drawFlies();
    },

    startFlies: function(){
      this.timer = setInterval(this.renderFliesAnimation, 40);
    },

    stopFlies: function(){
      clearInterval(this.timer);
    },

    fitToScreen: function(element) {
      element.width = window.innerWidth - 8;
      element.height = window.innerHeight - 37;
    },

  },

  mounted: function(){
      this.canvas = this.$refs.canvas;
      //this.canvas.style.width = "100%";
      //this.canvas.style.height = "700px";
      console.log(this.$refs);
      this.canvasWidth = this.$refs.canvas.offsetWidth;
      this.canvasHeight = this.$refs.canvas.offsetHeight;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      this.startFlies();
      this.pageLoaded = 'true';

  },

  beforeDestroy(){
    clearInterval(this.timer);
  }







})
