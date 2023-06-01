console.log("rock-paper=scissors");

const computerList = document.querySelectorAll(".computer ul li");
// computer라는 클래스 안의 ul 안에 li
// 변수.. const, let
const humanList = document.querySelectorAll(".human ul li");
const resultList = document.querySelector(".result ul");
const appendItems = function (className) {
  const appendItem = document.createElement("li");
  appendItem.classList.add(className);
  appendItem.textContent = className.substring(0, 1);
  resultList.appendChild(appendItem);
};

let computerChoice = 0;
//값이 변해야 해서 let..

//function makeRandom(){} ==> 아래와 같이 쓸 수 있다.. 아래처럼 쓰는게 더 좋다.
const makeRandom = function () {
  computerList[0].style.display = "none";
  computerList[1].style.display = "none";
  computerList[2].style.display = "none";
  computerChoice = Math.floor(Math.random() * 3);
  computerList[computerChoice].style.display = "block";
};

// Math.floor= > 정수만 필요할 때.. 소숫점 없애고 싶을 때..
// 중괄호를 벗어나면 소용이 없다.. console창에 입력해도 null 이 뜬다..

// 5번 할 수 있게..
// clearTimeout(idx)
let i = 0;
let gameIdx = 0;
humanList.forEach((item, idx) => {
  item.addEventListener("click", () => {
    i++;
    clearInterval(computerIdx);
    if (i >= 3) {
      //   clearInterval(computerIdx);
      clearTimeout(gameIdx);
    } else {
      gameIdx = setTimeout(() => {
        console.log("재실행");
        computerIdx = setInterval(makeRandom, 50);
      }, 1000);
    }

    // clearInterval(computerIdx);
    // setTimeout(() => {
    //   console.log("재실행");
    //   computerIdx = setInterval(makeRandom, 50);
    // }, 1000);
    // clearTimeout(()=> {
    //     console.log("")
    // })

    if (idx === computerChoice) {
      appendItems("draw");
    } else if (idx === 0 && computerChoice === 2) {
      appendItems("lose");
    } else if (idx === 1 && computerChoice === 0) {
      appendItems("lose");
    } else if (idx === 2 && computerChoice === 1) {
      appendItems("lose");
    } else {
      appendItems("win");
    }
  });
});
// foreach -> 배열 반복문 돌릴 때...
// humanList[0].addEventListener("click", () => {
//   clearInterval(computerIdx);
// });
// 사용자가 일으키는 이벤트를 발생시키려면...

//시간 간격을 만들어주는..(호출할 함수를 적고 시간을 적으면, 시간에 맞춰 호출된다.)
let computerIdx = setInterval(makeRandom, 50); // <-> clearInterval
// 0.05초마다 한번씩 호출..
//!!!!!!!!!!!!!!!!!!!!!! 정말정말 많이 쓰는 함수다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// 함수의 실행은
makeRandom();

// computerList[0].style.display = "none";
// computerList[1].style.display = "none";
// computerList[2].style.display = "none";
// // 배열 옆에 css 같이 적용해주려면.. 위와 같이..
// // random..

// const computerChoice = Math.floor(Math.random() * 3);
// // Math.random ==> 0~1 사이의 실수. 0<Math.random() < 1
// // 3을 곱하면.. 0부터 3 사이의 실수가 된다..
// // 0~2까지의 실수가 나와서
// 랜덤하고 싶은 수를 곱해준다??????????????????????????
// computerList[computerChoice].style.display = "block";
