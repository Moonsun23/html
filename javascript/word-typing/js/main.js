// 1. 주어진 단어 하나를 만든다. 배열에다 값을 넣고 그 중에 하나 골라서 뿌리기

const word = document.querySelector(".word");
const wordList = document.querySelector(".word-list ul");

const wordArray = []; // 배열은 참고
const firstWords = ["강아지", "소나기", "기상청", "청소부", "부잣집"];

console.log("🚀 ~ file: main.js:4 ~ firstWords:", firstWords);
// new Array라는 것도 있지만 잘 안쓴다.
// 5개 중에 랜덤으로 하나 나오게(위 5개 단어 쓴 부분)

// const firstWord = firstWords[Math.floor(Math.random() * 5)];
const firstWord = firstWords[Math.floor(Math.random() * firstWords.length)];

wordArray.push(firstWord);
console.log("🚀 ~ file: main.js:18 ~ wordArray:", wordArray);

console.log(firstWords.includes("기상청"));
// 중복되는 것이 없도록..

const appendWord = (inputWord) => {
  const li = document.createElement("li");
  li.textContent = inputWord;
  wordList.append(li);
  wordArray.push(inputWord);
};
appendWord(firstWord);
// const li = document.createElement("li");
// // li만들어서..
// li.textContent = firstWord;
// // li에 글자 넣어주려고 할때...
// wordList.append(li);
// // 이걸 쓰면 글자 하나가 랜덤하게 생김

const fault = () => {
  word.value = "";
  gsap.from(".input-box", { x: 100, duration: 5, ease: "elastic.out(1, 0.3)" });
};

// 2. word에 글자를 입력하고 enter 쳤을 때 마지막 단어의 마지막 글자랑 입력한 단어의 첫 글자가 같은지 따져야 함.

word.addEventListener("keyup", (e) => {
  //   console.log(e);
  if (e.key === "Enter" || e.keyCode === 13) {
    // console.log("Enter 누름");

    // const li = document.createElement("li");
    // li.textContent = word.value;
    // wordList.append(li);

    if (word.value.length !== 3) {
      //   alert("3글자만 입력 가능합니다.");
      //   word.value = "";
      //   gsap.from(".input-box", { x: 100, duration: 5, ease: "elastic.out(1, 0.3)" });
      //   return;
      fault();
      return;
    }
    //   console.log(word.value.substring(0, 1));
    //   console.log(word.value.charAt(0)); --->> 이것도 substring이랑 비슷한 역할.
    const lastWord = document.querySelector(".word-list ul li:last-child").textContent;
    const lastChar = lastWord.substring(2);
    // console.log(lastWord + "===" + lastChar);
    // console.log(lastWord);
    if (word.value.substring(0, 1) !== lastChar) {
      //   word.value = "";
      //   gsap.from(".input-box", { x: 100, duration: 1, ease: "elastic.out(1, 0.2)" });
      //   return;
      fault();
      return;
      // 함수가 return을 만나면 종료
    }
    if (wordArray.includes(word.value)) {
      fault();
      return;
    }
    if (checkDic(word.value) <= 0) {
      fault();
      return;
    }
    fetch(`https://opendict.korean.go.kr/api/search?key=DCEA7E48C869906D04A7BA311A3AC7CB&q=${word.value}&req_type=json`)
      // ? 를 쓴 것은 변수값을 쓰겠다 라는 뜻. 그리고 key와 q를 넣음.
      .then((response) => response.json())
      .then((data) => {
        if (data.channel.total <= 0) {
          fault;
          word.value = "";
        } else {
          appendWord(word.value);
          word.value = "";
        }
      });
    // wordArray.push(word.value);

    // 입력하면 입력한 값이 input 창에서 사라지게 하는 역할
    // word.value.length ==> 단어의 길이
  }
});
// 배열을 하나 만든다.
// 배열에 중복을 따져서 없으면 값을 입력한다.

const checkDic = (question) => {
  //ajax
  fetch(`https://opendict.korean.go.kr/api/search?key=DCEA7E48C869906D04A7BA311A3AC7CB&q=${question}&req_type=json`)
    // ? 를 쓴 것은 변수값을 쓰겠다 라는 뜻. 그리고 key와 q를 넣음.
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      //   console.log(data.channel.total);
      return data.channel.total;
    });
};
