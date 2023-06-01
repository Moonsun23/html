const container = document.querySelector(".map"); //지도를 담을 영역의 DOM 레퍼런스
const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.5667, 126.9784), //지도의 중심좌표.(위도, 경도)
  level: 3, //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
const geocoder = new kakao.maps.services.Geocoder(); //라이브러리에 service라는게 추가되어야 사용가능한 코드
geocoder.addressSearch("서울시 중구 세종대로 110", function (result, status) {
  // 정상적으로 검색이 완료됐으면
  if (status === kakao.maps.services.Status.OK) {
    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    /*
    // 결과값으로 받은 위치를 마커로 표시합니다
    const marker = new kakao.maps.Marker({
      map: map, //위 const map을 뜻함..
      position: coords,
    });

    // 인포윈도우로 장소에 대한 설명을 표시합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: '<div style="width:150px;text-align:center;padding:6px 0;">우리학원</div>',
    });
    infowindow.open(map, marker);
*/
    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다

    const imageSrc = "../images/map (1).png"; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(64, 64); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(32, 64) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // (32, 64)로 쓴 이유: 내가 잡은 좌표 포인트 위에 마커가 뜨게하기 위해.. 64로 위치를 올려야 함.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    const markerPosition = coords; // 마커가 표시될 위치입니다
    // 검색된 결과값으로 넣기위해 위의 const coords를 가져옴

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const content =
      '<div class="customoverlay">' +
      '  <a href="https://www.seoul.go.kr/main/index.jsp" target="_blank">' +
      '    <span class="title">서울의중심</span>' +
      "  </a>" +
      "</div>";

    // 커스텀 오버레이가 표시될 위치입니다
    const position = coords;

    // 커스텀 오버레이를 생성합니다
    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: content,
      yAnchor: 1,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    map.setCenter(coords);
  }
});
