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
