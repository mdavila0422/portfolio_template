/* $(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        console.log('Scroll up');
    }
    else {
        console.log('Scroll down');
    }
    }); */
var pageSection = document.querySelectorAll("section");
var currentPage = document.querySelector("section div.display");
var slideContainer = document.querySelector("#Projects div.container");
var slides = document.getElementsByClassName("project-slide");
var currIndex = 0;
var slideIndex = 1;
var slideRight = false;
var scrollUp = false;

window.addEventListener('wheel', function(e){
    scrollUp = e.wheelDelta < 0 ? false : true;
    fadeScroll();
});
window.addEventListener('keyup', function(e){
    scrollUp = e.code ==='ArrowDown' ? false : true;
    fadeScroll();
});

//display the first section
pageSection[currIndex].style.display = 'block';

function fadeScroll(){
    //fade up/down based on scroll
    if(scrollUp){
        pageSection[currIndex].classList.add('fade-down-element');
        setTimeout(function() {//hide and display other page
            hide(pageSection[currIndex]);
            currIndex === 0 ? currIndex = (pageSection.length - 1) : currIndex--;
            show(pageSection[currIndex]);//show next page in 
        }, 500);
    } else{
        pageSection[currIndex].classList.add('fade-up-element');
        setTimeout(function() {//hide and display other page
            hide(pageSection[currIndex]);
            currIndex === (pageSection.length - 1) ? currIndex = 0 : currIndex++;
            show(pageSection[currIndex]);
        }, 500);
    }
}

var show = function(elem) {
    elem.style.display = 'block';
    elem.classList.add('fade-in-element');
}

var hide = function(elem) {
    elem.style.display = 'none';
    elem.className = 'container';
}

// Next/previous controls
function plusSlides(n) {
    if(n > 0) {slideRight = true;}
    slideIndex += n;
    showSlides(slideIndex);
}

function showSlides(n) {
    if (n >= slides.length) {slideIndex = 0} //go to start
    if (n < 0) {slideIndex = (slides.length - 1)} //go to end
    //replace the scaling
    slideContainer.classList.add('fade-out-in');
    swap(slides);
    slideContainer.className = 'container';
  }

  function swap(arr) {
    var container = arr[0].parentNode;
    if(slideRight){
        //fade out and then fade back in with swapped order and size
        container.insertBefore(arr[0], arr[2].nextSibling);//take first element and move it to end
        for(let i = 0; i < arr.length; i++){
            arr[i].style.order = i; //change the order of the div
            arr[i].className = 'side-img mySlides'; //style the side divs
            if(i === 1){    //style main div
                arr[i].className = 'main-img mySlides';
            } else if(i >= 3){
                arr[i].style.display = 'none';
                return;
            }
        }
    } else{
        container.insertBefore(arr[2], arr[0]);//move last to first
        for(let i = 0; i < arr.length; i++){
            arr[i].style.order = i; //change the order of the div
            arr[i].className = 'side-img mySlides'; //style the side divs
            if(i === 1){    //style main div
                arr[i].className = 'main-img mySlides';
            } else if(i >= 3){
                arr[i].style.display = 'none';
                return;
            }
        }
    }
}