window.onload = function(){
    const navButton = document.querySelector('.nav_button')
    ,perspectiveEl = document.querySelector('.perspective')
    ,outNav = document.querySelector('.out-nav')
    ,outNavLiEls = outNav.querySelectorAll('li')
    ,slideUlEl = document.querySelector('.slide-ul')
    ,slideLiEls = slideUlEl.querySelectorAll('li')
    ,mainContentEl = document.querySelector('.main-content')
    ,sectionEls = mainContentEl.querySelectorAll('.section')
    ,containerEl = document.querySelector('.container')
    ,infoTextEl = document.querySelectorAll('.info--text')
    ,prevBtn = document.querySelector('.prev')
    ,nextBtn = document.querySelector('.next')
    ,sliderEls = document.querySelectorAll('.slider')
    ,moreBtnEls = document.querySelectorAll('.more-btn')
    ,hireInnerFromEl = document.querySelector('#hire--inner'),
    contactEl = document.querySelector('.contact'),
    contactInnerEl = contactEl.querySelector('.contact--inner'),
    contactInfoEl = contactInnerEl.querySelector('.contact--info');
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
                        moreBtnEls[0].classList.remove('isActive');
                    else
                        moreBtnEls[0].classList.add('isActive');
                }
                perspectiveEl.classList.remove('invisible');
            })
        }
        else
            return false;
    }
    const changeViewPort = (e) => {
        if(document.body.offsetWidth<=650)
            return false;
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
                        moreBtnEls[0].classList.remove('isActive');
                    else
                        moreBtnEls[0].classList.add('isActive');
                }
            })
        }
        else
            return false;
    }
    const changeToMore = (e) => {
        nowIndex = 4;
        slideLiEls.forEach((value,idx)=>{
            value.classList.remove('slide-active');
            if(idx === nowIndex){
                value.classList.add('slide-active');
                toggleSection();
                toggleOutNav();
                    moreBtnEls[0].classList.remove('isActive');
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
    moreBtnEls.forEach((moreBtn,idx)=>{
        moreBtn.addEventListener('click',changeToMore);
    })
    hireInnerFromEl.addEventListener('submit',(e)=>{
        e.preventDefault();
        alert('게시판 기능은 2주차에 추가하겠습니다 🥊');
    })
    /* Click Event end */
    infoTextEl.forEach(input=>{input.addEventListener('blur', toggleInfoValue);})
    let check = false;
    contactEl.addEventListener('mousemove',(e)=>{
        if(document.body.offsetWidth<=650)
            return false;
        if(check){
            return false;
        }
        let xAxis = (window.innerWidth/2 - e.pageX)/15;
        let yAxis = (window.innerHeight/2 - e.pageY)/15;
        
        contactInnerEl.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    })
    contactEl.addEventListener('mouseleave',(e)=>{
        if(document.body.offsetWidth<=650)
            return false;
        contactInnerEl.style.transform = `rotateY(0deg) rotateX(0deg)`;
    })
    contactInfoEl.addEventListener('mousemove',(e)=>{
        if(document.body.offsetWidth<=650)
            return false;
        check = true;
        contactInnerEl.style.transform = `rotateY(0deg) rotateX(0deg)`;
    })
    contactInfoEl.addEventListener('mouseout',(e)=>{
        if(document.body.offsetWidth<=650)
            return false;
        check = false;
    })
    window.addEventListener('keyup',(e)=>{
        if(e.key === 'ArrowDown'){
            ++nowIndex;
            if(nowIndex>4)
                nowIndex = 0;
            toggleSlide();
            toggleSection();
            toggleOutNav();
            if(nowIndex === 0 || nowIndex === 4)
                moreBtnEls[0].classList.remove('isActive');
            else
                moreBtnEls[0].classList.add('isActive');
        }
        else if(e.key === 'ArrowUp'){
            --nowIndex;
            if(nowIndex<0)
                nowIndex = 4;
            toggleSlide();
            toggleSection();
            toggleOutNav();
            if(nowIndex === 0 || nowIndex === 4)
                moreBtnEls[0].classList.remove('isActive');
            else
                moreBtnEls[0].classList.add('isActive');
        }
    })
}