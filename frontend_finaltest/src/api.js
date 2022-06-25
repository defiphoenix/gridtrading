import { useEffect, useRef, useState } from "react";

export async function test(formData) {
  const options = { method: "GET", headers: { Accept: "application/json" } };
  console.log("api뭐야");
  let body;
  const response = await fetch(
    "https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=1",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  // console.log(body);
  // const body = await response.json();
  return body;
}

export async function startTrading(formData) {
  console.log(formData);
  // const options = {
  //   method: "POST",
  //   headers: { Accept: "application/json", "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     market: "KRW-BTC",
  //     side: "ask",
  //     volume: "0.00072585",
  //     price: "30000000",
  //     ord_type: "limit",
  //   }),
  // };

  // fetch("https://api.upbit.com/v1/orders", options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));
  console.log("start trading");
  const BASE_URL = "http://localhost:8080/kafka/grid-trading";
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
//    headers: { "Content-Type": "application/json" }
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  if (!response.ok) {
    throw new Error("데이터를 생성하는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function ChartDraw() {
  const options = { method: "GET", headers: { Accept: "application/json" } };

  fetch(
    "https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=1",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};

export default useInterval;
