import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

let initialized = false;

export default function Index() {
  const [val, setVal] = useState(110);

  useEffect(() => {
    // Only run this once (react unmounts and remounts in dev mode)!
    if (initialized) return;
    initialized = true;

    const sensor = document.getElementById("sensor1");
    const sensorNum = document.getElementById("sensorNum");
    let eventSrc;
    let state;

    let connect = () => {
      console.log(`connecting...`);
      eventSrc = new EventSource("/api/data");

      eventSrc.onmessage = (event) => {
        const value = parseInt(event.data, 10);
        if (value > -1) {
          console.log(`value: ${parseInt(event.data, 10)}`);
          // setVal(value);
          // sensor.value = event.data;
          sensorNum.innerHTML = event.data;
        }
      };
    };

    connect();
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          Sensor App Demo&nbsp;
        </p>

        <div className="text-center">
          <br />
          <div>
            <Link
              className="text-blue-500 underline"
              target="_blank"
              href={"/sensor"}
            >
              Click me first and open each tab side-by-side
            </Link>
          </div>

          <div className="mt-40">
            <br />
            <label htmlFor="sensor">Real-Time Sensor Data</label>
            <br />
            <br />
            <br />
            <span id="sensorNum" className="text-2xl">
              {val}
            </span>
            &nbsp;
            <span>bpm</span>
            <br />
            {/*<input*/}
            {/*  type="range"*/}
            {/*  min="20"*/}
            {/*  max="200"*/}
            {/*  step="1"*/}
            {/*  value={val}*/}
            {/*  readOnly*/}
            {/*  id="sensor1"*/}
            {/*/>*/}
          </div>
          <br />
          <br />
          <br />
        </div>
        <br />

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
          <p className="place-items-center gap-2 p-8 lg:pointer-events-auto">
            &copy; 2023, Cormac Pujals
          </p>
        </div>
      </div>
    </main>
  );
}
