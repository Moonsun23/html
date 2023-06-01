const ldsEllipsis = document.querySelector(".lds-ellipsis");
const coronaList = document.querySelector(".coronaList ul");
//ul태그까지 찾아가자!

const removeItem = () => {
  const imgItem = document.querySelectorAll(".coronaList ul li");
  imgItem.forEach((item, idx) => {
    item.remove();
  });
  // 새로운 날짜 의 정보를 불러오기전 지워주는..
};

// fetch를 함수로 바꾸기위한 내용(아래)
const loadCoronaData = async (date) => {
  removeItem();
  // 정보가 새로 업데이트 되기 전 지워주는 실행문..?
  ldsEllipsis.classList.remove("off");
  const corona = await fetch(
    `http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=XyuSbJbnHDSebh4okN0z1TtEFzK1CFObr9kJUYp3h24dbqmfSOFH9TsLUPRxv3KKy5nDnC0dLy3G9ITeJxYI6w%3D%3D&pageNo=1&numOfRows=500&apiType=JSON&std_day=${date}`
    // 특정 한 날짜가 아니라 내가 날짜를 픽하면 그날짜의 정보를 가지고 오기 위해 위에 fetch 부분을 함수로 바꿔준다.
  );
  const response = await corona.json();
  // .then((response) => response.json())
  // // 위는 한줄로 쓸 수 있어서 return이 생략된것
  // .then((data) => {
  // console.log(data);
  const items = response.items; //반복문 만들기..
  ldsEllipsis.classList.remove("off");
  // 결과가 나왔을 때 off 되는 것이라...

  const sortedItems = _.sortBy(items, ["gubun"]);
  // 정렬해서 나오게 하려고... 하지만 그냥 items도 그대로 둔다....
  // 원본데이터가 바뀌지 않도록 해주는 lodash 메서드..(?)
  // 정렬된 items를 만들어줘서 아래 foreach 반복문을 돌린다.............
  // 데이터불변의 법칙
  // 그냥 sort로 쓰면 원본을 변형시킨다(배열의 순서가 바뀌기 때문에)

  // items.sort(function (a, b) {
  //   if (a.gubun > b.gubun) return 1;
  //   if (a.gubun == b.gubun) return 0;
  //   if (a.gubun < b.gubun) return -1;
  // });

  // 배열 정렬하는거...(위에)
  sortedItems.forEach((item, idx) => {
    console.log(item.gubun + "===" + item.incDec);
    const li = document.createElement("li");
    //li를 만들고
    const region = document.createElement("span");
    region.classList.add("region");

    const incDec = document.createElement("span");
    incDec.classList.add("incDec");
    region.textContent = item.gubun;
    incDec.textContent = item.incDec;
    li.append(region);
    li.append(incDec);
    coronaList.append(li);
    //li를 집어넣어라
  });
  gsap.from(".coronaList ul li", { scale: 0, duration: 0.5, stagger: 0.02 });
  // 데이터가 자연스럽게 나오게... 부드러운 팝업
};

const datePicker = new Lightpick({
  field: document.querySelector(".date-picker"),
  format: "YYYY-MM-DD",
  onSelect: function (date) {
    // console.log(date.format("YYYY-MM-DD"));
    loadCoronaData(date.format("YYYY-MM-DD"));
  },
});
// class를 불러올때는 항상 앞에 .!!!

datePicker.setDate(new Date());
// loadCoronaData("2023-05-30");

const numbers = [2, 1, 4, 5, 44, 11, 3];
console.log(
  numbers.sort(function (a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;

    // 혹은 return b-a;(양수가 나오면 앞으로 보내고, 음수가 나오면 뒤로.,0이 나오면 그대로 두고..)
  })
);
const chars = ["a", "b", "w", "q", "x"];
console.log(chars.sort()); // 문자는 연산이 안되기 때문에 if를 다 써줘야 함.

const animals = ["chicken", "cat", "dog"];
const myAnimals = animals;
animals.push("camel");
console.log(myAnimals);

let a = 100;
let b = a;
a += 100;
console.log(b + "===" + a);
// let은 바뀌기 때문에...

const person = { name: "장문선", age: 30 };
// const person02 = person;
const person02 = { ...person };
// {}의 속성을 모두 나열해준다... "..."는 spread operator
// 배열 또는 객체의 원본을 훼손하지 않고 복사해간다...
person.name = "장동건";
console.log(person02.name); // 얕은 복사(shallow copy)
//안에 내용물이 바뀌면 따라서 바뀐다...
