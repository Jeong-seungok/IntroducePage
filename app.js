window.onload = function(){
    const navButton = document.querySelector('.nav_button');
    const perspectiveEl = document.querySelector('.perspective');
    const outNav = document.querySelector('.out-nav');
    const outNavLiEls = outNav.querySelectorAll('li');
    const slideUlEl = document.querySelector('.slide-ul');
    const slideLiEls = slideUlEl.querySelectorAll('li');
    const mainContentEl = document.querySelector('.main-content');
    const sectionEls = mainContentEl.querySelectorAll('.section');
    const containerEl = document.querySelector('.container');
    let nowIndex = 0;
    
    /* Click Event start */
    const openNav = () => {
        perspectiveEl.classList.add('effect-rotate');
        outNav.classList.add('is-vis');
    }
    const changeNav = (e) => {
        const target = e.target;
        if(target.classList.contains('out-li')){
            outNavLiEls.forEach((value,idx)=>{
                value.classList.remove('is-select');
                if(value === target){
                    target.classList.add('is-select');
                    nowIndex = idx;
                    toggleSlide();
                    toggleSection();
                    outNav.classList.remove('is-vis');
                    perspectiveEl.classList.remove('effect-rotate');
                }
            })
        }
        else
            return false;
    }
    const changeViewPort = (e) => {
        if(!perspectiveEl.classList.contains('effect-rotate'))
            return false;
        else if(perspectiveEl.classList.contains('effect-rotate')){
            if(e.target === navButton)
                return false;
            else{
                outNav.classList.remove('is-vis');
                perspectiveEl.classList.remove('effect-rotate');
            }
        }
    }
    const changeSlide = (e) => {
        const target = e.target;
        if(target.classList.contains('slide')){
            slideLiEls.forEach((value,idx)=>{
                value.classList.remove('slide-active');
                if(value === target){
                    nowIndex = idx;
                    value.classList.add('slide-active');
                    toggleSection();
                    toggleOutNav();
                }
            })
        }
        else
            return false;
    }
    const toggleSlide = () =>{
        slideLiEls.forEach((value,idx)=>{
            value.classList.remove('slide-active');
            if(idx === nowIndex)
                value.classList.add('slide-active');
        })
    }
    const toggleSection = () => {
        sectionEls.forEach((value,idx)=>{
            value.classList.remove('section-active');
            if(idx === nowIndex)
                setTimeout(()=>value.classList.add('section-active'),500);
        })
    }
    const toggleOutNav = () => {
        outNavLiEls.forEach((value,idx)=>{
            value.classList.remove('is-select');
            if(idx === nowIndex)
                value.classList.add('is-select');
        })
    }
    navButton.addEventListener('click', openNav);
    outNav.addEventListener('click',changeNav);
    containerEl.addEventListener('click',changeViewPort);
    slideUlEl.addEventListener('click',changeSlide);
    /* Click Event end */
}