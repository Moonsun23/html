const gnbList = document.querySelectorAll(".gnb .list > li");
const header = document.querySelector(".header");
gnbList.forEach((item, idx) => {
  item.addEventListener("mouseenter", () => {
    header.classList.add("on");
  });
});
header.addEventListener("mouseleave", () => {
  header.classList.remove("on");
});

new Swiper(".media .mask", {
  slidesPerView: "auto",
  // auto는 내가 정하는 것이기 때문에 li의 넓이도 내가 반드시 지정해야 한다.
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
});
