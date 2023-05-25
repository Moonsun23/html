Splitting();
AOS.init();

const header = document.querySelector(".header");
// header.classList.add("on");
// 사용자가 scroll을 해서 스크롤의 높이가 0보다 커지면 on을 단다.

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  const scrollY = window.scrollY;
  // 스크롤바의 위치값
  if (scrollY > 0) {
    header.classList.add("on");
  } else {
    header.classList.remove("on");
  }
});
// 필요하면 매개변수 e(이벤트객체)를 적어준다..
// 객체라서 속성과 메서드를 가지고 있다.

gsap.from(".main-visual .slogan .char", { y: 100, opacity: 0, ease: "power3", duration: 1, delay: 1, stagger: 0.02 });

new Swiper(".banner .mask", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: true,
  navigation: {
    prevEl: ".banner .mask .btn-prev",
    nextEl: ".banner .mask .btn-next",
  },
  pagination: {
    el: ".banner .mask .pagination",
    clickable: true,
  },
});
new Swiper(".partner .brand", {
  slidesPerView: "auto",
  speed: 1000,
  loop: true,
  loopedSlides: 5,
  autoplay: {
    delay: 10,
    disableOnInteration: false,
  },
});
new Swiper(".recruit .txt-box .rolling", {
  direction: "vertical",
  loop: true,
  autoplay: {
    delay: 1500,
  },
});
