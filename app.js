window.onload = function(){
    const navButton = document.querySelector('.nav_button');
    const perspective = document.querySelector('.perspective');
    const outNav = document.querySelector('.out-nav');
    const slideUlEl = document.querySelector('.slide-ul');
    const slideLiEls = slideUlEl.querySelectorAll('li');
    const mainContentEl = document.querySelector('.main-content');
    const sectionEls = mainContentEl.querySelectorAll('.section');
    let nowIndex = 0;
    
    const openNav = () => {
        perspective.classList.add('effect-rotate');
        outNav.classList.add('is-vis');
    }
    const changeNav = (e) => {
        const target = e.target;
        const outNavLiEls = outNav.querySelectorAll('li');
        outNavLiEls.forEach((value,idx)=>{
            value.classList.remove('is-select');
            if(value === target){
                target.classList.add('is-select');
                nowIndex = idx;
            }
        })
        slideLiEls.forEach((value,idx)=>{
            value.classList.remove('slide-active');
            if(idx === nowIndex)
                value.classList.add('slide-active');
        })
        sectionEls.forEach((value,idx)=>{
            value.classList.remove('section-active');
            if(idx === nowIndex)
                value.classList.add('section-active');
        })
        outNav.classList.remove('is-vis');
        perspective.classList.remove('effect-rotate');
    }

    navButton.addEventListener('click', openNav);
    outNav.addEventListener('click',changeNav);
}