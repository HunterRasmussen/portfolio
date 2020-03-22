new Vue({

    el: '#root',

    data: {


    },

    methods: {
        printDetails: function(){
            console.log(this.$refs.one);
        },
    },



})

const $marker = document.querySelector("#oneTop");
const $elementOne = document.querySelector("#one");
const $markerTwo = document.querySelector("#oneBot");
const $elementTwo = document.querySelector("#two");

const stickyHeader = () => function() {
  const sr1 = $marker.getBoundingClientRect();
  const srTwo = $markerTwo.getBoundingClientRect();
  const 

  if (sr1.top > 0) { //marker isn't at top
    $elementOne.classList.remove("sticky");
    $marker.style.top = 0;
  } else {
    $elementOne.classList.add("sticky");
    $marker.style.top = -1;
  }
  if(srTwo.top > 0) {
      $elementTwo.classList.remove("sticky");
  }
  else{
    $elementTwo.classList.add("sticky");
    $elementOne.classList.remove("sticky");
    $elementOne.classList.add("pushed");
    $elementOne.style.top = 50% - 

    $markerTwo.style.top = -1;
  }
};

window.addEventListener("scroll",  stickyHeader()); //_.debounce(stickyHeader(), 15) );




