// 처음 작성한 내용을 보려면 _main.js를 볼것.
// 1. computer li 2개 중에 하나만 보이게 하기...
// 2. computer li를 무작위로 나오게 setInterval 만들기..
//3. 밑에 human li에 이벤트 걸기
//4. human li 클릭 했을 때 멈추게 하기 clearInterval
//5. 승패 확인하기...

//뭔가 잘못됐으니 한번 더 해보기...

const computerList = document.querySelectorAll(".computer ul li");
const humanList = document.querySelectorAll(".human ul li");
const resultList = document.querySelector(".result ul");

// 태그를 만들어라..(위 const li 부분 기초..)
// const li = document.createElement("li");
// li.textContent = "w";
// li.classList.add("win");
// resultList.append(li);

let computerChoice = 0;

const makeRandom = function () {
  computerList[0].style.display = "none";
  computerList[1].style.display = "none";
  computerList[2].style.display = "none";

  computerChoice = Math.floor(Math.random() * 3);
  computerList[computerChoice].style.display = "block";
  // 랜덤하게 나오는 부분을...만들기 위해..!
  // 3개 다 안보이게 처리하지만 셋 중에 하나는 랜덤으로 보여줘라!!!
  // 11번 줄부터~
};
let computerIdx = setInterval(makeRandom, 50);

// 배열에 쓸수있는 forEach(메서드.. 배열을 한번 뺑 돌아주는..)
// 배열을 한바퀴 돌면서 뭐할지 정해주는 함수를 정의해줘야 함..

const appendItems = function (className) {
  const li = document.createElement("li");
  li.classList.add(className);
  li.textContent = className.substring(0, 1);
  resultList.appendChild(li);
};
let count = 0;
let gameIdx = 0;
humanList.forEach((item, idx) => {
  //   console.log(item);
  item.addEventListener("click", function () {
    clearInterval(computerIdx);
    count++;
    if (count >= 3) {
      clearTimeout(gameIdx);
    } else {
      gameIdx = setTimeout(function () {
        computerIdx = setInterval(makeRandom, 10);
      }, 1000);
    }

    // setTimeout(function () {
    //   computerIdx = setInterval(makeRandom, 50);
    // }, 1000);
    if (computerChoice === idx) {
      appendItems("draw");
    } else if ((computerChoice === 0 && idx === 1) || (computerChoice === 1 && idx === 2) || (computerChoice === 3 && idx === 0)) {
      appendItems("lose");
    } else {
      appendItems("win");
    }
  });
});
