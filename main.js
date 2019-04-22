var pageSection = document.querySelectorAll("section");
var currentPage = document.querySelector("section div.display");
var sideNav = document.querySelector(".side-nav-list");
var sidenavList = document.querySelectorAll('.side-nav-list li');
var slideContainer = document.querySelector("#Projects div.project-container");
var slides = document.getElementsByClassName("project-slide");
var checkButtons = document.getElementsByClassName("check-button");
var currIndex = 0;
var slideIndex = 1;
var slideRight = false;
var scrollUp = false;

/* Scroll Event handler throttled */
const scrollHandler = e => {
    scrollUp = e.wheelDelta < 0 ? false : true;
    fadeScroll();
};
const tsHandler = throttle(1000, scrollHandler);
window.addEventListener("wheel", tsHandler);

/* Keyup Event handler throttled */
const keyHandler = e => {
    if(e.code === 'ArrowDown'){
        scrollUp = false;
        fadeScroll();
    }
    else if (e.code === "ArrowUp"){
        scrollUp = true;
        fadeScroll();
    } 
};
const tkHandler = throttle(1000, keyHandler);
window.addEventListener("keyup", tkHandler);

/* Vertical Pan event handler */
var mc = new Hammer(window);
const panHandler = e => {
    scrollUp = e.type === 'panup' ? true : false;
    fadeScroll();
};
const tpHandler = throttle(1000, panHandler);
mc.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc.on("panup pandown", tpHandler);

/* sidenav click event handler */
let navFinder = e => {
    let target = e.target;
    if(target === sideNav) {return;}
    /* hide(currIndex); */
    pageSection[currIndex].className = 'm-section';
    removeActive(currIndex);
    currIndex = getElementIndex(target);
    target.classList.add('is-active');
    target.firstChild.style.opacity = 1;
    target.firstChild.style.visibility = 'visible';
    /* show(currIndex); */
    pageSection[currIndex].classList.add('section--is-active');
}
sideNav.addEventListener("click", navFinder);

function getElementIndex(node) {
    var index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}

function removeActive(index) {
    sidenavList[index].classList.remove('is-active');
    sidenavList[index].firstChild.style.opacity = 0;
    sidenavList[index].firstChild.style.visibility = 'hidden';
}

/* contact page button event listener */
let hireContainer = document.querySelector('.hire-container');
hireContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('check-button')){
        const icon = "<i id='icon' class='fas fa-check'></i>";
        var final = icon + event.target.innerHTML;
        if (event.target.className.indexOf('checked') > -1) {
            event.target.classList.remove('checked');
            event.target.removeChild(event.target.firstChild);
        } else {
            event.target.classList.add('checked');
            event.target.innerHTML = final;
        }
    }
}, false);

/* Throttle function */
function throttle(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

//display the first section
pageSection[0].classList.add('section--is-active');
sidenavList[currIndex].classList.add('is-active');
sidenavList[currIndex].firstChild.style.opacity = 1;
sidenavList[currIndex].firstChild.style.visibility = 'visible';
slides[1].lastElementChild.style.visibility = 'visible';

function fadeScroll(){
    //fade up/down based on scroll
    changeNav(currIndex);
    if(scrollUp){
        pageSection[currIndex].classList.add('fade-down-element');
        setTimeout(function() {//hide and display other page
            // hide(currIndex);
            pageSection[currIndex].className = 'm-section';
            currIndex === 0 ? currIndex = (pageSection.length - 1) : currIndex--;
            // show(currIndex);//show next page in
            pageSection[currIndex].classList.add('section--is-active');
            sidenavList[currIndex].classList.add('is-active'); 
        }, 500);
    } else{
        pageSection[currIndex].classList.add('fade-up-element');
        setTimeout(function() {//hide and display other page
            // hide(currIndex);
            pageSection[currIndex].className = 'm-section';
            currIndex === (pageSection.length - 1) ? currIndex = 0 : currIndex++;
            // show(currIndex);
            pageSection[currIndex].classList.add('section--is-active');
            sidenavList[currIndex].classList.add('is-active');
        }, 500);
    }
}

function changeNav(index) {
    var j = index;
    sidenavList[j].classList.remove('is-active');
    sidenavList[j].firstChild.style.opacity = 0;
    sidenavList[j].firstChild.style.visibility = 'hidden';
    if(scrollUp){
        j === 0 ? j = (pageSection.length - 1) : j--;
        sidenavList[j].firstChild.style.opacity = 1;
        sidenavList[j].firstChild.style.visibility = 'visible';
        sidenavList[j].classList.add('is-active');
    }else {
        j === (pageSection.length - 1) ? j = 0 : j++;
        sidenavList[j].firstChild.style.opacity = 1;
        sidenavList[j].firstChild.style.visibility = 'visible';
        sidenavList[j].classList.add('is-active');
    }
    
}

var show = function(index) {
    pageSection[index].style.display = 'block';
    pageSection[index].classList.add('fade-in-element');
    
}

var hide = function(index) {
    pageSection[index].style.display = 'none';
    pageSection[index].classList.remove('fade-in-element');
    pageSection[index].classList.remove('fade-up-element');
    pageSection[index].classList.remove('fade-down-element'); 
}

function removeElement(elementID){
    var element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
}

/* Next/previous controls on projects slides */
function plusSlides(n) {
    if(n > 0) {slideRight = true;}
    slideIndex += n;
    // slideContainer.classList.add('fade-out-in');
    showSlides(slideIndex);
}

function showSlides(n) {
    if (n >= slides.length) {slideIndex = 0} //go to start
    if (n < 0) {slideIndex = (slides.length - 1)} //go to end
    //initiate the animation, swap then remove animation  
    swap(slides);
  }

  function swap(arr) {
    var container = arr[0].parentNode;
    if(slideRight){
        //fade out and then fade back in with swapped order and size
        container.insertBefore(arr[0], arr[2].nextSibling);//take first element and move it to end
        for(let i = 0; i < arr.length; i++){
            arr[i].style.order = i; //change the order of the div
            arr[i].className = 'side-img project-slide'; //style the side divs
            arr[i].lastElementChild.style.visibility = 'hidden';
            if(i === 1){    //style main div
                arr[i].className = 'main-img project-slide';
                arr[i].lastElementChild.style.visibility = 'visible';
            } else if(i >= 3){
                arr[i].style.display = 'none';
                return;
            }
        }
    } else{
        container.insertBefore(arr[2], arr[0]);//move last to first
        for(let i = 0; i < arr.length; i++){
            arr[i].style.order = i; //change the order of the div
            arr[i].className = 'side-img project-slide'; //style the side divs
            arr[i].lastElementChild.style.visibility = 'hidden';
            if(i === 1){    //style main div
                arr[i].className = 'main-img project-slide';
                arr[i].lastElementChild.style.visibility = 'visible';
            } else if(i >= 3){
                arr[i].style.display = 'none';
                return;
            }
        }
    }
}
