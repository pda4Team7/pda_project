import React from "react";

export default function StaionSelect({ color }) {
  // 이후에 이건 서버에서 받아올 것
  const stations = [
    {
      name: "장암",
      number: 701,
    },
    {
      name: "도봉산",
      number: 702,
    },
    {
      name: "수락산",
      number: 703,
    },
    {
      name: "마들",
      number: 704,
    },
    {
      name: "노원",
      number: 705,
    },
    {
      name: "중계",
      number: 706,
    },
    {
      name: "하계",
      number: 707,
    },
    {
      name: "공릉(서울과학기술대)",
      number: 708,
    },
    {
      name: "태릉입구",
      number: 709,
    },
    {
      name: "먹골",
      number: 710,
    },
    {
      name: "중화",
      number: 711,
    },
    {
      name: "상봉",
      number: 712,
    },
    {
      name: "면목",
      number: 713,
    },
    {
      name: "사가정",
      number: 714,
    },
    {
      name: "용마산(용마폭포공원)",
      number: 715,
    },
    {
      name: "중곡",
      number: 716,
    },
    {
      name: "군자(능동)",
      number: 717,
    },
    {
      name: "어린이대공원(세종대)",
      number: 718,
    },
    {
      name: "건대입구",
      number: 719,
    },
    {
      name: "자양(뚝섬한강공원)",
      number: 720,
    },
    {
      name: "청담",
      number: 721,
    },
    {
      name: "강남구청",
      number: 722,
    },
    {
      name: "학동",
      number: 723,
    },
    {
      name: "논현",
      number: 724,
    },
    {
      name: "반포",
      number: 725,
    },
    {
      name: "고속터미널",
      number: 726,
    },
    {
      name: "내방",
      number: 727,
    },
    {
      name: "이수",
      number: 728,
    },
    {
      name: "남성",
      number: 729,
    },
    {
      name: "숭실대입구(살피재)",
      number: 730,
    },
    {
      name: "상도",
      number: 731,
    },
    {
      name: "장승배기",
      number: 732,
    },
    {
      name: "신대방삼거리",
      number: 733,
    },
    {
      name: "보라매",
      number: 734,
    },
    {
      name: "신풍",
      number: 735,
    },
    {
      name: "대림(구로구청)",
      number: 736,
    },
    {
      name: "남구로",
      number: 737,
    },
    {
      name: "가산디지털단지",
      number: 738,
    },
    {
      name: "철산",
      number: 739,
    },
    {
      name: "광명사거리",
      number: 740,
    },
    {
      name: "천왕",
      number: 741,
    },
    {
      name: "온수(성공회대입구)",
      number: 742,
    },
    {
      name: "까치울",
      number: 743,
    },
    {
      name: "부천종합운동장",
      number: 744,
    },
    {
      name: "춘의",
      number: 745,
    },
    {
      name: "신중동",
      number: 746,
    },
    {
      name: "부천시청",
      number: 747,
    },
    {
      name: "상동",
      number: 748,
    },
    {
      name: "삼산체육관",
      number: 749,
    },
    {
      name: "굴포천",
      number: 750,
    },
    {
      name: "부평구청",
      number: 751,
    },
    {
      name: "산곡",
      number: 752,
    },
  ];
  return (
    <div className="station-select-container">
      {stations.map((elem, i) => (
        <div className="station-item">
          <div className="station-select">
            <div
              className="station-select-line"
              style={{ border: "4px solid " + color, backgroundColor: color }}
            ></div>
            <div
              className="station-select-circle"
              style={{ border: "4px solid " + color }}
            ></div>
          </div>
          <div className="station-info">
            <div
              key={"station-number" + i}
              className="station-number"
              style={{ border: "4px solid " + color }}
            >
              {elem.number}
            </div>
            <div key={"station-name" + i} className="station-name">
              {elem.name}
            </div>
          </div>
          <div className="station-select">
            <div
              className="station-select-line"
              style={{ border: "4px solid " + color, backgroundColor: color }}
            ></div>
            <div
              className="station-select-circle"
              style={{ border: "4px solid " + color }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
