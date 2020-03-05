


new Vue({

  el: '#root',

  data: {

    pageLoaded: 'false',
    menu: 'MENU |',
    menuhover: 'MENU ||',
    menuDown: 'MENU X',
    curSpinnerIndex: 0,
    nameSpinnerOptions: ['HUNT', 'LEARN', 'COD', 'VIDEOGRAPH', 'PHILOSOPH'],
    nameSpinnerDescriptions: ["My name is Hunter Rasmussen.", "My brother in law once said to me \"You are interested in everything.\"",
                               "I like the problem solving that occurs when coding", "I love the art of storytelling through movies.",
                               "I love the critical thinking and open mind that studying philosophy engenders."],
    nameDescriptionHover: false,
    spinnerHolder: '',
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
        this.$refs.firstName.id = "firstName";
        this.$refs.lastName.id = "lastName"
        this.$refs.mastImage.id = "mastImage";
      }
      else{
        this.$refs.myMenu.id = "menuDropDown";
        this.$refs.mainLogo.id = "logoWithMenu";
        this.$refs.menuItems.id = "menuItems";
        this.$refs.firstName.id = "firstNameWithMenu";
        this.$refs.lastName.id = "lastNameWithMenu";
        this.$refs.mastImage.id = "mastImageWithMenu";
      }

      // console.log(this.$refs);

    },

    sleep: function(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    },

    nameSpin: function(){
      anime.timeline({loop: false})
      .add({
        targets: '#nameSpinner .spanNameLetter',
        translateY: [0,-100],
        opacity: [1,0],
        // easing: "easeInExpo",
        duration: 1000,
        delay: function(el, i) {
          return 0 + 30 * i;
        }
      });
      console.log("Here");
      setTimeout(this.nameSpinCont, 500);
    },

    nameSpinCont: function(){
      console.log("There");
      this.curSpinnerIndex += 1;
      if(this.curSpinnerIndex >= this.nameSpinnerOptions.length){
        this.curSpinnerIndex = 0;
      }
      this.$refs.spinnerRef.innerText = this.nameSpinnerOptions[this.curSpinnerIndex];
      this.$refs.spinnerRef.innerHTML = this.nameSpinnerOptions[this.curSpinnerIndex];
      console.log(this.curSpinnerIndex);
      this.createNameSpinnerSpan();
      anime.timeline({loop: false})
        .add({
          targets: '#nameSpinner .spanNameLetter',
          translateY: [100,0],
          translateZ: 0,
          opacity: [0,1],
          easing: "easeOutExpo",
          duration: 1400,
          delay: function(el, i) {
            return 0 + 30 * i;
          }
        });
    },

    createNameSpinnerSpan: function() {
      this.spinnerHolder = this.$refs.spinnerRef;
      var text = this.spinnerHolder.innerText;
      console.log(this.spinnerHolder.innerHTML);
      newHTMLArray = [];
      for(let i = 0; i < text.length; i++){
        var toAdd = "<span class='spanNameLetter'>" + text[i] + "</span>";
        newHTMLArray.push(toAdd);
      }
      toReturn = newHTMLArray.join("");
      this.spinnerHolder.innerHTML = toReturn;
      console.log(toReturn);
      console.log(this.spinnerHolder);
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
        // console.log(this.currentFlies[i]);
        this.context.fillStyle = 'rgba(' + this.currentFlies[i].color.red + ', '
            + this.currentFlies[i].color.green + ', '
            + this.currentFlies[i].color.blue + ', '
             + this.currentFlies[i].color.alpha + ')';
        this.context.arc( this.currentFlies[i].x, this.currentFlies[i].y,
                          this.currentFlies[i].size, 0, Math.PI * 2, false );
        // console.log(this.context.arc);
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
      this.createNameSpinnerSpan();
      this.pageLoaded = 'true';

  },

  beforeDestroy(){
    clearInterval(this.timer);
  }







})

$(document).on("scroll", function () {
  var pageTop = $(document).scrollTop()
  var pageBottom = pageTop + $(window).height() * 7/8
  var tags = $("section") 

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]
    if ($(tag).position().top < pageBottom) { 
      $(tag).addClass("visible")
  }
}
})
