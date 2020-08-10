gsap.registerPlugin(ScrollTrigger);

// HEADER ANIMATION
gsap.from('#me', {
  duration:1.75, y:"-100px", ease:'sine',opacity:0, scrollTrigger:".header-pic"
});    

gsap.from("#circle-1", {
  duration:2.25, y:"100px", ease:"sine",opacity:0
});

gsap.from("#circle-2", {
  duration:2, y:"-100px", ease:"sine",opacity:0
});

gsap.from("#aboutme video", {
  duration:1.75, x:"100px", ease:"sine",opacity:0, scrollTrigger: '#aboutme video'
});

// FIXED SCROLL ROTATE ANIMATION


gsap.set('#rotate-fixed', {xPercent:-50});

var rotate = gsap.timeline({
  scrollTrigger:{
    trigger: "main",
    // pin: true,
    scrub:0.2,
    start: 'top top',
    end:'+=10000',
  }
})
.to('#rotate-fixed', {
  rotation:360*5,
  duration:1, ease:'none',
})



