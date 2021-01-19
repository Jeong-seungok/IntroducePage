window.onload = function(){
    /* Element start */
    const perspectiveEl = document.querySelector('.perspective'),
    wrapperEl = perspectiveEl.querySelector('.wrapper'),
    navButton = document.querySelector('.nav_button'),
    outNav = document.querySelector('.out-nav'),
    outNavLiEls = outNav.querySelectorAll('li'),
    slideUlEl = document.querySelector('.slide-ul'),
    slideLiEls = slideUlEl.querySelectorAll('li'),
    mainContentEl = document.querySelector('.main-content'),
    sectionEls = mainContentEl.querySelectorAll('.section'),
    containerEl = document.querySelector('.container'),
    infoTextEl = document.querySelectorAll('.info--text'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    sliderEls = document.querySelectorAll('.slider'),
    moreBtnEls = document.querySelectorAll('.more-btn'),
    hireInnerFromEl = document.querySelector('#hire--inner'),
    contactEl = document.querySelector('.contact'),
    contactInnerEl = contactEl.querySelector('.contact--inner'),
    contactInfoEl = contactInnerEl.querySelector('.contact--info'),
    ModeBtnEl = document.querySelector('.Mode--btn'),
    logoEl = document.querySelector('.logo');
    /* Element end */

    /* Default Value start */
    const lastNav = slideLiEls.length - 1,
    directionClassName = ['left','center','right'];
    let nowIndex = 0; 
    let cursorOnInfo = false;
    /* Default Value end */
    
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
                    toggleMoreBtn();
                    outNav.classList.remove('is-vis');
                    perspectiveEl.classList.remove('effect-rotate');
                }
            });
        }
        else
            return false;
    }
    const changeViewPort = (e) => {
        // 모바일 + rotate 효과전 perspectiveEl 클릭 방지
        // Nav버튼 이벤트 중복 방지(effect-rotate 삭제 방지)
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
                    toggleMoreBtn();
                }
            })
        }
        else
            return false;
    }
    const changeToMore = () => {
        nowIndex = lastNav;
        slideLiEls.forEach((value,idx)=>{
            value.classList.remove('slide-active');
            if(idx === nowIndex){
                value.classList.add('slide-active');
                toggleSection();
                toggleOutNav();
                toggleMoreBtn();
            }
        })
    }
    const fadeBack = () => {
        const popDirection = directionClassName.shift();
        directionClassName.push(popDirection);
        changeDirection();
    }
    const fadeFront = () => {
        const popDirection = directionClassName.pop();
        directionClassName.unshift(popDirection);
        changeDirection();
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
        const inputEl = e.target
        if(inputEl.value !== '')
            inputEl.classList.add('has-value');
        else
            inputEl.classList.remove('has-value');
    };
    const toggleMoreBtn = () => {
        if(nowIndex === 0 || nowIndex === lastNav)
            moreBtnEls[0].classList.remove('isActive');
        else
            moreBtnEls[0].classList.add('isActive');
    }
    const changeDirection = () => {
        sliderEls.forEach((el,idx)=>{
            el.classList.remove(el.classList[1]);
            el.classList.add(directionClassName[idx]);
        })
    }
    const changeMode = () => {
        document.body.classList.toggle('dark');
        ModeBtnEl.classList.toggle('dark');
    }

    navButton.addEventListener('click', openNav);
    outNav.addEventListener('click',changeNav);
    containerEl.addEventListener('click',changeViewPort);
    slideUlEl.addEventListener('click',changeSlide);
    prevBtn.addEventListener('click',fadeBack);
    nextBtn.addEventListener('click',fadeFront);
    moreBtnEls.forEach((moreBtn)=>{
        moreBtn.addEventListener('click',changeToMore);
    })
    ModeBtnEl.addEventListener('click', changeMode);
    /* Click Event end */
    
    /* Submit Event start */
    hireInnerFromEl.addEventListener('submit',(e)=>{
        e.preventDefault();
        alert('게시판 기능은 2주차에 추가하겠습니다 🥊');
    });
    /* Submit Event end */

    /* Blur Event start */
    infoTextEl.forEach(input=>{input.addEventListener('blur', toggleInfoValue);});
    /* Blur Event end */

    /* mouse Event start */
    const resetRotate = () => {
        if(document.body.offsetWidth<=650)
            return false;
        contactInnerEl.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
    contactEl.addEventListener('mousemove',(e)=>{
        if(document.body.offsetWidth<=650)
            return false;
        if(cursorOnInfo)
            return false;
        let xAxis = (window.innerWidth/2 - e.pageX)/15;
        let yAxis = (window.innerHeight/2 - e.pageY)/15;
        
        contactInnerEl.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    contactEl.addEventListener('mouseleave',(e)=>{
        resetRotate();
    });
    contactInfoEl.addEventListener('mousemove',(e)=>{
        resetRotate();
        cursorOnInfo = true;
    });
    contactInfoEl.addEventListener('mouseleave',(e)=>{
        if(document.body.offsetWidth<=650)
            return false;
        cursorOnInfo = false;
    });
    /* mouse Event end */

    /* key Event start */
    document.addEventListener('keyup',(e)=>{
        if(e.key === 'ArrowDown'){
            ++nowIndex;
            if(nowIndex > lastNav)
                nowIndex = 0;
            toggleSlide();
            toggleSection();
            toggleOutNav();
            toggleMoreBtn();
        }
        else if(e.key === 'ArrowUp'){
            --nowIndex;
            if(nowIndex<0)
                nowIndex = lastNav;
            toggleSlide();
            toggleSection();
            toggleOutNav();
            toggleMoreBtn();
        }
    });
    /* key Event start */

    /* Mobile Response start*/
    window.addEventListener('resize', function(){
        if(document.body.offsetWidth <= 365){
            logoEl.children[1].innerText = 'Jeong';
        }else{
            logoEl.children[1].innerText = 'Jeong SeungOk';
        }
    })
    /* Mobile Response end*/
}