import { useEffect, useState } from "react";

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
  console.log("테스트트레이딩");
  console.log(formData);
  const BASE_URL = "localhost:8080/kafka/grid-trading";
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 생성하는데 실패했습니다");
  }
  const body = await response.json();
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
