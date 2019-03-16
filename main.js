/* $(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        console.log('Scroll up');
    }
    else {
        console.log('Scroll down');
    }
    }); */
var scrollPos = 0;
var homePage = document.getElementById('Home');
var projectsPage = document.getElementById('Projects');
var aboutPage = document.getElementById('About');
var contactPage = document.getElementById('Contact');
var scrollUp = false;
var currIndex = 0;
const pageArr = [homePage, projectsPage]


window.addEventListener('scroll', function() {
    if((document.body.getBoundingClientRect()).top > scrollPos){
        console.log("up");
        scrollUp = true;
    }else{
        console.log("down");
        scrollUp = false;
    }
    scrollPos = (document.body.getBoundingClientRect()).top;
    document.getElementById('showScroll').innerHTML = pageYOffset + 'px ' + scrollUp;
    });

//PageTransitions on scroll eventw
if(scrollUp && currIndex !== 0){
    pageArr[currIndex].classList.add('fade-down');
    currIndex--;
    pageArr[currIndex.classList].add('display');
} else {
    //scroll down add fadeup animation to current page
    // then increment index to display next page
    
    pageArr[currIndex].classList.add('fade-up');
    currIndex++;
}