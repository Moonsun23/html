fetch(
  "https://apis.data.go.kr/B551011/GoCamping/searchList?serviceKey=XyuSbJbnHDSebh4okN0z1TtEFzK1CFObr9kJUYp3h24dbqmfSOFH9TsLUPRxv3KKy5nDnC0dLy3G9ITeJxYI6w%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&keyword=%EC%95%BC%EC%98%81%EC%9E%A5&_type=json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

const markers = [];

const mapContainer = document.querySelector(".map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 13, // 지도의 확대 레벨
  };

// 지도를 생성합니다
const map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드로 장소를 검색합니다
searchPlaces();

const search = document.querySelector(".search");
search.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    searchCampPlace(search.value);
  }
});
