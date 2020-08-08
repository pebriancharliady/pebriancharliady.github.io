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
    
