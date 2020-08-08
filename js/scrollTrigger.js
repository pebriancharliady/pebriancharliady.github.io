gsap.registerPlugin(ScrollTrigger);

gsap.from("#me", {
  duration:1.75, y:"-100px", ease:'sine',opacity:0
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