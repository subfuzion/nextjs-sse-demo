import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let timestamp = Date.now();

  async function postData(value) {
    if (Date.now() - timestamp < 50) return;
    timestamp = Date.now();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "close",
      },
      body: JSON.stringify({ value: value }),
    };
    try {
      console.log(`post value: ${value}`);
      const res = await fetch("/api/data", requestOptions);
      if (!res.ok) {
        console.error(res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          Sensor App Demo&nbsp;
        </p>

        <div className="text-center">
          <div className="mt-40">
            <label htmlFor="sensor">
              Adjust the slider to simulate a sensor collecting data. Sensor
              data is sent to the server every 20th of a second.
            </label>
            <br />
            <br />
            <br />
            <input
              type="range"
              min="20"
              max="200"
              step="1"
              id="sensor"
              onInput={(e) => postData(e.target.value)}
            />
          </div>
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
