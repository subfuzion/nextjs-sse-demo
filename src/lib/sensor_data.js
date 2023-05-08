/**
 * Mock database for storing time-series data in a buffer.
 */
const BUFFER_MAX = 1024 * 1024; // 1 MB

export class Database {
  static _data = [];

  appendData(n) {
    let d = Database._data;
    if (d.length >= BUFFER_MAX) {
      // console.log(`Database buffer overflow: ${d.length} (dropping oldest 1K of data)`);
      const discard = 1024;
      Database._data = d = d.slice(discard);
    }
    Database._data.push(n);
    // console.log(`write buffer.length: ${d.length}`);
  }

  getData() {
    const d = Database._data;
    if (!d.length) {
      // console.log(`Database buffer underflow (return value: -1)`);
      return -1;
    }
    const val = d.shift();
    // console.log(`read buffer.length: ${d.length}`);
    return val;
  }
}
