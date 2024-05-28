// 몇호선인지 선택하는 Component
import React from "react";

export default function LineSelect({ setLine, setColor }) {
  const total_line = [
    { line: 1, color: "#263F93" },
    { line: 2, color: "#41B353" },
    { line: 3, color: "#EF6C1D" },
    { line: 4, color: "#2FA0DB" },
    { line: 5, color: "#883FDB" },
    { line: 6, color: "#B44F19" },
    { line: 7, color: "#697121" },
    { line: 8, color: "#E31F6D" },
    { line: 9, color: "#D1A43C" },
  ];
  return (
    <div className="subway-select-number">
      <div className="subway-select-number-row">
        {total_line.map((elem, i) => (
          <div
            className="subway-line-circle"
            style={{ backgroundColor: elem.color }}
            onClick={() => {
              setLine(elem.line);
              setColor(elem.color);
            }}
          >
            {elem.line}
          </div>
        ))}
      </div>
    </div>
  );
}
