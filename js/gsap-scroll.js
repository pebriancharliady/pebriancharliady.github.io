var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

// tl.to('.sticky', .5, {y:-300, opacity: 1})
// tl2.fromTo('.rotate-pict', {rotation:0},{rotation:359});
// tl.from('#me', 0.5, {y:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
// tl.from('#circle-2', 1, {y:-200, opacity:0});
// tl.from('#circle-1', 1, {y:200, opacity:0});
// tl.from('#header-headline', 5, {x:-100, opacity:0});


// tl2.to('.welcome', .5, {y:-10, opacity: 0})
// tl.from('blockquote', .5, {x:300, opacity: 0});
// tl.from('span', 1, { width: 0}, "=-.5");

const scene = new ScrollMagic.Scene({
  triggerElement: ".sticky",
            triggerHook: ("onLeave", 0),
            duration: 2000,
})
  .setPin(".sticky")
  .setTween(tl)
		.addTo(controller);

const scene2 = new ScrollMagic.Scene({
  triggerElement: ".welcome",
  triggerHook: ("onEnter", 0),
            duration: 1000,
})
  .setPin('.welcome')
  .setTween(tl2)
		.addTo(controller);



function updatePercentage() {
  //percent.innerHTML = (tl.progress() *100 ).toFixed();
  tl.progress();
  console.log(tl.progress());
}