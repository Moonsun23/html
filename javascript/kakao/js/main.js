// ajax(asynchronous javascript and xml(요즘은 json) 비동기)
// console.log("01");
// console.log("02");
// setTimeout(() => {
//   console.log("03");
// }, 1000);
// console.log("04");

const thumbsList = document.querySelector(".thumbs-box ul");

const search = document.querySelector(".search");
search.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    const searchWord = search.value;
    searchImg(searchWord);
  }
});

// 함수 fetch

// 기존이미지 없애기(재검색 시 초기화)=> li태그 없애기...
const removeItem = () => {
  const imgItem = document.querySelectorAll(".thumbs-box ul li");
  imgItem.forEach((item, idx) => {
    item.remove();
  });
};

const searchImg = async (searchWord) => {
  // 기존이미지 없애기(재검색 시 초기화)=> li태그 없애기...
  removeItem();
  const imgResponse = await fetch(`https://dapi.kakao.com/v2/search/image?query=${searchWord}`, {
    headers: { Authorization: "KakaoAK 1cf956128e661163a813e3e91e08cd06" },
  });
  const imgJson = await imgResponse.json();
  const imgList = imgJson.documents;
  imgList.forEach(function (item, idx) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const a = document.createElement("a");
    img.src = item.thumbnail_url;

    a.href = item.image_url;
    a.setAttribute("data-fancybox", "gallery");
    a.append(img);
    li.append(a);

    thumbsList.append(li);
  });
  gsap.from(".thumbsList li", { scale: 0, duration: 1, stagger: 0.02 });
  // 글자, 그림에 효과주는거..?
  Fancybox.bind("[data-fancybox]", {
    // Your options go here
  });
};

const searchImg2 = async (searchWord2) => {
  // 기존이미지 없애기(재검색 시 초기화)=> li태그 없애기...
  removeItem();
  const imgResponse = await fetch(`https://dapi.kakao.com/v2/search/vclip?query=${searchWord2}`, {
    headers: { Authorization: "KakaoAK 1cf956128e661163a813e3e91e08cd06" },
  });
  const imgJson = await imgResponse.json();
  const imgList = imgJson.documents;
  imgList.forEach(function (item, idx) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const a = document.createElement("a");
    img.src = item.thumbnail_url;

    a.href = item.image_url;
    a.setAttribute("data-fancybox", "gallery");
    a.append(img);
    li.append(a);

    thumbsList.append(li);
  });
  gsap.from(".thumbsList li", { scale: 0, duration: 1, stagger: 0.02 });
  // 글자, 그림에 효과주는거..?
  Fancybox.bind("[data-fancybox]", {
    // Your options go here
  });
};
