const container = document.querySelector(".map"); //지도를 담을 영역의 DOM 레퍼런스
const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.(위도, 경도)
  level: 13, //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 마커 클러스터러를 생성합니다
const clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 10, // 클러스터 할 최소 지도 레벨
});

const content = "";
// 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다

const overlay = new kakao.maps.CustomOverlay({
  content: content,
  // 위의 const content 부분을 뜻함
  // 아래 overlay로 내리면서 내용은 지워도 되지만 변수 자체는 지우면 안됨.. 만약 지우려면 위의 content: content로 지워야 함.
  //   map: map,
  //   position: marker.getPosition(),
});

const searchChargePlace = async (place) => {
  clusterer.clear();
  const charge = await fetch(
    `https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?page=1&perPage=1000&returnType=JSON&cond%5Baddr%3A%3ALIKE%5D=${place}&serviceKey=XyuSbJbnHDSebh4okN0z1TtEFzK1CFObr9kJUYp3h24dbqmfSOFH9TsLUPRxv3KKy5nDnC0dLy3G9ITeJxYI6w%3D%3D`
  ); // async는 await를 쓴다는 준비..! fetch만 쓸 경우 fetch가 바로 서버로 확인하러 간다..?
  //%EC%84%9C%EC%9A%B8 위 주소의 이 부분이 서울.
  const response = await charge.json();
  //   const data = response.data;(두번 넣을 필요 없어서 지움)
  // .then(function (response) {
  //   return response.json();
  // })
  // .then(function (data) {
  //   console.log(data); --> async, await를 쓰면서 지우게 댐.
  const evChargeList = response.data;
  // data로 클래스 명을 지어놔서..data의 data를 가져온다..
  const markers = [];
  evChargeList.forEach((item, idx) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(item.lat, item.longi),
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
      overlay.setPosition(marker.getPosition());
      // return 값을 가지고 있는 함수라서 꼭 괄호를 써줘야 한다...
      // 아래는 내용출력(지도상 표현되는 마커 위 내용)
      overlay.setContent(`<div class="wrap">  
      <div class="info">  
          <div class="title">  
              ${item.csNm}  
              <div class="close" onclick="closeOverlay()" title="닫기"></div>  
          </div>  
          <div class="body">  
              
              <div class="desc">  
                  <div class="ellipsis">${item.addr}</div>  
                  <div class="type ellipsis">${item.cpNm}</div>  
              </div>  
          </div>  
      </div>     
  </div>`);
      map.setCenter(marker.getPosition());
    });
    //아래 markers 자체가 배열이라.. 위에 const markers 추가
    markers.push(marker);
    // markers에 배열을 추가해주자! -> 위의 const markers=[];

    // 클러스터러에 마커들을 추가합니다
  });
  clusterer.addMarkers(markers);
  // });
};
// searchChargePlace("서울");

//아래 - 검색 시 가져올 정보..
const search = document.querySelector(".search");
search.addEventListener("keyup", (e) => {
  //e= enter를 쳤을 때 나오게 하려고..
  console.log(e);
  if (e.key === "Enter" || e.keyCode === 13) {
    // 13 -> enter 키 번호가 13...이걸 위해 위 콘솔로그를 찍어보면 keyCode에 13이라고 뜸
    searchChargePlace(search.value);
  }
});
function closeOverlay() {
  overlay.setMap(null);
}
