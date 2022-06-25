import { useState } from "react";

// let socket; // 소켓

// 웹소켓 연결
function CreatSocketConnection(type, conncectType, dataMaker) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  let payload = 0;
  const [data, setData] = useState("");
  let socket = new WebSocket("wss://api.upbit.com/websocket/v1");
  socket.binaryType = "arraybuffer";

  socket.onopen = () => {
    //console.log("?");
    socket.send(
      JSON.stringify([
        { ticket: "UNIQUE_TICKET" },
        { type: "ticker", codes: ["KRW-BTC"] }, // "KRW-BTC","KRW-ETH" -> parsing
        { type: "orderbook", codes: ["KRW-BTC"] },
        { type: "trade", codes: ["KRW-BTC"] },
      ])
    );
  };

  socket.onmessage = (e) => {
    //console.log("message");
    var enc = new TextDecoder("utf-8");
    var arr = new Uint8Array(e.data);
    var str_d = enc.decode(arr);
    var d = JSON.parse(str_d);
    if (d.type === "ticker") {
      // 현재가 데이터
      setData(d.trade_price);
      // TOD
      //console.log(d.opening_price);
      // payload = d.opening_price;
    }
    if (d.type == "orderbook") {
      // 호가 데이터
      // TODO
    }
    if (d.type == "trade") {
      // 체결 데이터
      // TODO
    }
  };
  socket.onerror = (e) => {
    //console.log(e);
  };
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

//   return () => (dispatch, getState) => {
//     let socket = new WebSocket("wss://api.upbit.com/websocket/v1");
//     socket.binaryType = "arraybuffer";

//     //socket = new WebSocket("wss://api.upbit.com/websocket/v1");
//     //socket.binaryType = "arraybuffer";

//     socket.onopen = () => {
//       console.log("?");
//       socket.send(
//         JSON.stringify([
//           { ticket: "UNIQUE_TICKET" },
//           { type: "ticker", codes: ["KRW-BTC"] }, // "KRW-BTC","KRW-ETH" -> parsing
//           { type: "orderbook", codes: ["KRW-BTC"] },
//           { type: "trade", codes: ["KRW-BTC"] },
//         ])
//       );
//     };

//     socket.onclose = function (e) {
//       socket = undefined;
//     };

//     socket.onmessage = (e) => {
//       console.log("?");
//       var enc = new TextDecoder("utf-8");
//       var arr = new Uint8Array(e.data);
//       var str_d = enc.decode(arr);
//       var d = JSON.parse(str_d);
//       const state = getState();
//       if (d.type == "ticker") {
//         dispatch({ type: SUCCESS, payload: state });
//         // 현재가 데이터
//         // TOD
//         console.log("yay");
//       }
//       if (d.type == "orderbook") {
//         // 호가 데이터
//         // TODO
//       }
//       if (d.type == "trade") {
//         // 체결 데이터
//         // TODO
//       }
//     };
//     socket.onerror = (e) => {
//       dispatch({ type: ERROR, payload: e });
//     };
//   };

// function closeWS() {
//   if (socket != undefined) {
//     socket.close();
//     socket = undefined;
//   }
// }

export default CreatSocketConnection;
