// 슬라이더
var slider1 = new Slider('d-slider', 1, 1, 1, 0);
slider1.auto();
var slider2 = new Slider('c-slider', 3, 1, 1, 10);
slider2.auto();

// 헤더색상
window.addEventListener('scroll', function(){
  var nextColor = window.innerHeight-30 <= window.scrollY ? 'rgb(0, 0, 0)':'rgb(255, 255, 255)';
  if(nextColor !== document.querySelector('header').style.color){
    document.querySelectorAll('.profile .menu li .item').forEach(function(item){
      item.style.color = nextColor;
    });
    document.querySelector('header').style.color = nextColor;
  }
})