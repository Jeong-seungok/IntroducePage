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
    const infoTextEl = document.querySelectorAll('.info--text');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const sliderEls = document.querySelectorAll('.slider');
    const hireusBtn = document.querySelector('.hireus-btn');
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
                    if(nowIndex === 0 || nowIndex === 4)
                        hireusBtn.classList.remove('isActive');
                    else
                        hireusBtn.classList.add('isActive');
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
                    if(nowIndex === 0 || nowIndex === 4)
                        hireusBtn.classList.remove('isActive');
                    else
                        hireusBtn.classList.add('isActive');
                }
            })
        }
        else
            return false;
    }
    const changeToHire = (e) => {
        nowIndex = 4;
        slideLiEls.forEach((value,idx)=>{
            value.classList.remove('slide-active');
            if(idx === nowIndex){
                value.classList.add('slide-active');
                toggleSection();
                toggleOutNav();
                hireusBtn.classList.remove('isActive');
            }
        })
    }
    const directionClassName = ['left','center','right'];
    const fadeBack = () => {
        const popDirection = directionClassName.shift();
        directionClassName.push(popDirection);
        sliderEls.forEach((el,idx)=>{
            el.classList.remove(el.classList[1]);
            el.classList.add(directionClassName[idx]);
        })
    }
    const fadeFront = () => {
        const popDirection = directionClassName.pop();
        directionClassName.unshift(popDirection);
        sliderEls.forEach((el,idx)=>{
            el.classList.remove(el.classList[1]);
            el.classList.add(directionClassName[idx]);
        })
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
                value.classList.add('section-active');
        })
    }
    const toggleOutNav = () => {
        outNavLiEls.forEach((value,idx)=>{
            value.classList.remove('is-select');
            if(idx === nowIndex)
                value.classList.add('is-select');
        })
    }
    const toggleInfoValue = (e)=> {
        if(e.target.value !== '')
            e.target.classList.add('has-value');
        else
            e.target.classList.remove('has-value');
    };

    navButton.addEventListener('click', openNav);
    outNav.addEventListener('click',changeNav);
    containerEl.addEventListener('click',changeViewPort);
    slideUlEl.addEventListener('click',changeSlide);
    prevBtn.addEventListener('click',fadeBack);
    nextBtn.addEventListener('click',fadeFront);
    hireusBtn.addEventListener('click',changeToHire);
    /* Click Event end */
    infoTextEl.forEach(input=>{input.addEventListener('blur', toggleInfoValue);})

    window.addEventListener('keyup',(e)=>{
        if(e.key === 'ArrowDown'){
            ++nowIndex;
            if(nowIndex>4)
                nowIndex = 0;
            toggleSlide();
            toggleSection();
            toggleOutNav();
        }
        else if(e.key === 'ArrowUp'){
            --nowIndex;
            if(nowIndex<0)
                nowIndex = 4;
            toggleSlide();
            toggleSection();
            toggleOutNav();
        }
    })
}