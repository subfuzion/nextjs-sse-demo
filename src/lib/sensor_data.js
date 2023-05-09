/**
 * Mock database for storing time-series data in a buffer.
 */
const BUFFER_MAX = 1024 * 1024; // 1 MB

// eslint-disable-next-line import/prefer-default-export
export class Database {
  static data = [];

  // eslint-disable-next-line class-methods-use-this
  appendData(n) {
    if (Database.data.length >= BUFFER_MAX) {
      // console.log(`Database buffer overflow: ${d.length} (dropping oldest 1K of data)`);
      const discard = 1024;
      Database.data = Database.data.slice(discard);
    }
    Database.data.push(n);
    // console.log(`write buffer.length: ${d.length}`);
  }

  // eslint-disable-next-line class-methods-use-this
  getData() {
    const d = Database.data;
    if (!d.length) {
      // console.log(`Database buffer underflow (return value: -1)`);
      return -1;
    }
    const val = d.shift();
    // console.log(`read buffer.length: ${d.length}`);
    return val;
  }
}
