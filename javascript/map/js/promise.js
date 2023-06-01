// 원래는 new Promise로 시작
// 약속을 지켰는지? 못지켰는지에 따라 resolve, reject..
/*
const myPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("success");
    // reject("fail");
  }, 1000);
});

console.log(myPromise);

myPromise.then(function (msg) {
  console.log(msg);
});
myPromise.catch(function (msg) {
  console.log(msg);
});
myPromise.finally(function () {
  console.log("이건 무조건 출력");
  console.log(myPromise);
}); */

const user = {
  id: "hi1237",
  name: "장문선",
};

function fetchUser() {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  return fetch(url).then((response) => {
    return response.json();
  });
}
// --> 비동기적 실행을 동기적으로 바꾼다. async, await..
// async는 함수 앞에만 붙일 수 있고, await는 async 안에서만 쓸 수 있다.
async function checkName() {
  const user = await fetchUser();
  if (user.id === 1) {
    console.log(user.name);
    // .name 부분을 .username이라고 쓰면 Bret이 나오는거..
  }
}
// checkName();
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => data.userId)
  .then(function (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then(function (user) {
        //  console.log(user.name);
      });
  });

async function fetchUserName(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await response.json();
  const userId = post.userId;
  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const user = await userResponse.json();
  return user.name;
}

fetchUserName(1).then(function (name) {
  console.log(name);
});
//비동기적 함수를 동기적으로 쓸 때 쓰는 함수가 await...
