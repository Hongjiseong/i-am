/**
 * // 필수사항
 * <div id="아이디">
 *  <div>항목1</div>
 *  <div>항목2</div>
 *  <div>항목3</div>
 * </div>
 * 
 * // 선택사항 (개발중)
 * <div class="s-paging"><div>
 */

var Slider = function(id, _web, _tab, _mobile, _spacing){
  var containerWidth = 0;
  var sliderItemWidth = 0;
  var totalCount = 0;
  var spacing = _spacing;
  var display = _web;
  var left = 0;
  var interval;
  var index = 0;

  var DOM = {
    container: function(id){
      var dom = document.querySelector('#'+id);
      dom.className = dom.className + ' container';
      dom.style.position = 'relative';
      dom.style.overflow = 'hidden';
      dom.style.padding = 0;
      return dom;
    },
    slider: function(container){
      totalCount = container.children.length;

      var dom = document.createElement('div');
      dom.className = dom.className + ' slider'
      dom.style.position = 'relative';
      dom.style.overflow = 'hidden';
      dom.style.height = '100%';
      dom.style.left = 0;
      dom.style.transition = 'left .5s';
      return dom;
    },
    paging: function(){
      var dom = document.querySelector('.page');
    }
  }

  // DOM 만들기
  var container = DOM.container(id);
  var slider = DOM.slider(container);
  var temp = container.innerHTML;
  container.innerHTML = '';
  slider.innerHTML = temp;
  container.appendChild(slider);
  var items = document.querySelector('#'+ id + ' .slider').children;
  for(var i=0; i<items.length; i++){
    items[i].style.float = 'left';
    items[i].style.height = '100%';
    items[i].style.width = (sliderItemWidth-spacing)+ 'px';
    items[i].style['margin-right'] = spacing+'px'; // 간격
  }

  // 화면 사이즈 수정시 발생하는 이벤트
  function resize(){
    left = 0;
    document.querySelector('#'+ id + ' .slider').style.left = left + 'px';

    var innerWidth = window.innerWidth;
    if(innerWidth >= 1000){
      setDisplayCount(_web);
    }else if(innerWidth < 1000 && innerWidth >= 768) {
      setDisplayCount(_tab);
    }else if (innerWidth < 768) {
      setDisplayCount(_mobile);
    }

    if(display === 1){
      spacing = 0;
      var items = document.querySelector('#'+ id + ' .slider').children;
      for(var i=0; i<items.length; i++){
        items[i].style.width = sliderItemWidth + 'px';
        items[i].style['margin-right'] = 0 + 'px'; // 간격
      }
    }else {
      spacing = _spacing;
    }
  }

  // 디스플레이 갯수 설정 함수
  function setDisplayCount(count) {
    display = count;
    
    containerWidth = container.offsetWidth + spacing;
    sliderItemWidth = containerWidth / display;

    document.querySelector('#'+ id + ' .slider').style.width = totalCount * sliderItemWidth + spacing * totalCount + 'px';
    var items = document.querySelector('#'+ id + ' .slider').children;
    for(var i=0; i<items.length; i++){
      items[i].style.width = (sliderItemWidth-spacing)+ 'px';
      items[i].style['margin-right'] = spacing + 'px'; // 간격
    }
  }

  // 반응형 디스플레이 갯수 조절
  var isResponsive = _tab != undefined && _mobile != undefined;
  if(isResponsive){
    window.onresize = resize
  }
  resize();

  
  return {
    resize:resize,
    setDisplayCount: setDisplayCount,
    move: function(index){
      left = (-1) * sliderItemWidth * index;
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
    },
    prev: function(){
      left += sliderItemWidth;
      var limit = 0;
      if(left > limit){
        left = limit;
      }
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
    },
    next: function(){
      left -= sliderItemWidth;
      var limit = (-1) * sliderItemWidth * (totalCount - display);
      if(left < limit){
        left = limit;
      }
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
    },
    auto: function(){
      interval = setInterval(function(){
        index++;
        left -= sliderItemWidth;
        var limit = (-1) * sliderItemWidth * (totalCount - display);
        if(left < limit){
          index = 0;
          left = 0;
        }
        document.querySelector('#'+ id + ' .slider').style.left = left + 'px';

        var isPaging = document.querySelectorAll('#'+ id + '+.paging .move').length > 0;
        if(isPaging){
          document.querySelectorAll('#'+ id + '+.paging .move').forEach(function(move){
            move.className = 'move';
          })
          document.querySelectorAll('#'+ id + '+.paging .move')[index].classList.add('on');
        }
      }, 4000)
    },
    stop: function(){
      clearInterval(interval);
    }
  }
}