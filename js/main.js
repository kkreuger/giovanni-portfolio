
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

// Animation - Page transition In
function pageTransitionIn() {
    const tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    })
}

function pageTransitionOut() {
    const tl = gsap.timeline();

    tl.to(".loading-screen", {
        duration: 1,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });

    tl.set(".loading-screen", { left: "0%", width: "0%" });
}

function contentAnimation() {
    const tl = gsap.timeline()
    tl.from("main", { duration: 1, x: -500, opacity: 0, stagger: 0.4 })
}

$(function () {
    barba.init({
        sync: true,
        transitions: [
            {
                async leave(data) {
                    const done = this.async()

                    pageTransitionIn()
                    await delay(1000)
                    done()
                },

                async enter(data) {
                    pageTransitionOut()
                    if (data.next.namespace === 'home') playSlider()
                    contentAnimation()
                },

                async once(data) {
                    pageTransitionOut()
                    if (data.next.namespace === 'home') playSlider()
                    if (data.next.namespace === 'work') playSlider()
                    contentAnimation()
                },
            },
        ],
    });
});

barba.hooks.before(() => {
    scroll.stop();
});

barba.hooks.enter(() => {
    scroll.scrollTo('top',{
        offset: 0,
        smooth: false,
        disableLerp: true,
        duration: 0
    });

    scroll.update();
});

barba.hooks.after(() => {
    scroll.update();
    scroll.start();
});

function toggleMenu() {
    document.querySelector('.slide-nav').classList.toggle('open')
}
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    mobile: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

window.addEventListener("load", (event) => {
    scroll.update()
});

window.onresize = scroll.update();

//IMAGE CAROUSEL
function playSlider() {
    $('.client-slider').slick({
        autoplay: true,
        slidesToShow: 1,
        arrows: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
};

function openAccordion(element) {
    element.parentElement.classList.toggle('active')
}