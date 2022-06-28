var i = 0;
var txt = 'A collection of random useful internet tools, made from scratch. Find your favourite tool now!';
var speed = 50;


document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 500);
});

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".homepage-heading-text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

setInterval(function(){
    $('#list').stop().animate({scrollTop:200},2450,'linear',function(){
      $(this).scrollTop(0).find('span:last').after($('span:first', this));
    });
}, 2500);