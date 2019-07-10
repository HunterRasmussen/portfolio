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
const $stickyElement = document.querySelector("#one");

const stickyHeader = () => function() {
  const sr1 = $marker.getBoundingClientRect();
  const sr2 = $stickyElement.getBoundingClientRect();

  if (sr1.top > 0) { //marker has reached top
    $stickyElement.classList.remove("sticky");
    $marker.style.top = 0;
  } else {
    $stickyElement.classList.add("sticky");
    $marker.style.top = -1;
  }
};

window.addEventListener("scroll",  stickyHeader()); //_.debounce(stickyHeader(), 15) );




