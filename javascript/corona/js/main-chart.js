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
  ldsEllipsis.classList.add("off");
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

  const cities = [];
  const values = [];

  // 배열 정렬하는거...(위에)
  sortedItems.forEach((item, idx) => {
    cities.push(item.gubun);
    values.push(item.incDec);
  });
  makeChart(cities, values);
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
let myChart = null;
const makeChart = (cities, values) => {
  const ctx = document.querySelector(".chart");
  if (myChart !== null) myChart.destroy();
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: cities,
      datasets: [
        {
          label: "시도별 확진자 수",
          data: values,
          borderWidth: 1,
          // backgroundColor: ["#9BD0F5", "fff", "ccff33"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
