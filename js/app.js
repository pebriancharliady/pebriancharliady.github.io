function send(){
    window.open('mailto:pebriancharliady@gmail.com?subject=JOB_OFFER');
}

document.querySelector(".toggler").addEventListener('change', (e) => {
    if(e.target.checked) {
        document.querySelector(".menu-wrap .hamburger > div").style.backgroundColor = "#fff";
        document.body.style.overflow = 'hidden';
    } else {
        document.querySelector(".menu-wrap .hamburger > div").style.backgroundColor = "#7B0A1C";
        document.body.style.overflow = 'unset';
    }
})

window.addEventListener('scroll',(e) => {
    var scroll = document.documentElement.scrollTop;
    // console.log(scroll)
    if (scroll > 500) {
      document.getElementById('back-top').style.opacity = 1;
    }else{
        document.getElementById('back-top').style.opacity = 0;
    }
})

document.getElementById('rotate-fixed').setAttribute('draggable',false)
