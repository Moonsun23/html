// Dom의 구성요소 검색해서 살펴보기
/*const menu01 = document.querySelector(".master-piece .menu li:nth-child(1)");
const menu02 = document.querySelector(".master-piece .menu li:nth-child(2)");
const menu03 = document.querySelector(".master-piece .menu li:nth-child(3)");

menu01.addEventListener("click", function () {
  alert("menu01을 눌렀습니다.");
});
//  위 function 부분은 선언만 되어있고 이름이 없다. => 익명함수
//  사용자가 이벤트를 발생시켰을 때 나중에 호출된다. callback
menu02.addEventListener("click", callFunc);

menu03.addEventListener("click", function () {
  alert("menu03을 눌렀습니다.");
});

function callFunc() {
  console.log("함수를 실행합니다.");
}*/
// callFunc();
const header = document.querySelector(".header");
const menu = document.querySelectorAll(".master-piece .menu li");
// 진짜 배열은 아님.. 그러므로 배열의 메서드는 쓸 수 없음. =유사배열이라고 함
// console.log(menu);
const gnbList = document.querySelectorAll(".gnb .list > li");
gnbList.forEach(function (item, idx) {
  item.addEventListener("mouseenter", function () {
    header.classList.add("on");
  });
  item.addEventListener("mouseleave", function () {
    header.classList.remove("on");
  });
});
// const - 변수가 바뀔일이 없다면 변수선언을 const
// let - 변수를 재정의 할 일이 있다면 let...

// for (let i = 0; i < menu.length; i++) {
//   menu[i].addEventListener("click", function () {
//     alert(i + "번째 입니다.");
//   });
// }

// 일급 객체
//함수를 변수에 할당 할 수 있다.
// 다른 함수를 인자(argument)로 전달 받을 수 있다.
// 다른 함수의 결과로서 리턴이 가능하다.
// 자바의 함수는 데이터처럼 처리한다(값으로 인식한다)

// 익명함수만 =>(화살표)로 function을 대체할수있다.

function bb() {
  console.log("함수 선언문 입니다.");
}
const aa = function () {
  console.log("함수 표현식 입니다.");
};
bb();
aa();
const sum = function (a, b) {
  return a + b;
};
// --> 이렇게도 쓸 수 있음const sum= (a, b)=> a+b;
console.log(sum(100, 100));

const double = function (num) {
  return num * 2;
};

// 매개변수가 하나일 때는 const double = num => num*2;라고 쓸 수 있다.

// function aa() {
//   console.log(190901 + 19090);
// }
// 화살표 함수 fat arrow function     자바 ramda

const contentsList = document.querySelectorAll(".master-piece .contents li");

menu.forEach((item, idx) => {
  //함수 안의 함수를 매개변수로 쓸 수 있다.
  item.addEventListener("mouseenter", () => {
    // console.log(idx + "번째 입니다.");
    contentsList.forEach(function (item02, idx02) {
      item02.classList.remove("on");
    });
    const target = document.querySelector(`.master-piece .contents li:nth-child(${idx + 1})`);
    console.log(target);
    target.classList.add("on");
  });
  item.addEventListener("mouseleave", () => {
    contentsList.forEach((item02, idx02) => {
      item02.classList.remove("on");
    });
  });
});

//prettier-ignore
const mainSwiper = new Swiper(".main-visual .mask", { 
  speed: 600, 
  loop: true,
  effect: "fade",
  navigation: {
    nextEl: ".main-visual .btns .btn-next",
    prevEl: ".main-visual .btns .btn-prev",
  },
  pagination:{
    el:".main-visual .pagination",
    type: "fraction",
  }
 });
const swiper = new Swiper(".social .mask", {
  speed: 600,
  slidesPerView: 4,
  spaceBetween: 25,
  // loopSlides: 10,
  loop: true,
  navigation: {
    nextEl: ".social .btns .btn-next",
    prevEl: ".social .btns .btn-prev",
  },
  pagination: {
    el: ".social .pagination .inner",
    type: "progressbar",
  },
});
// const fruits = ["apple", "melon", "peach"];
