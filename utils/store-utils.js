/*Initializes and connects a LowDB JSON database for a given data type
This function:
 -Creates a JSON file if it doesn't exist;
 -Sets up a LowDB database instance using that file;
 -Returns the LowDB instance so you can read/write data.
 */
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import * as fs from "fs";

export function initStore(dataType) {
  const store = {
    file: `./models/${dataType}.json`,
    [dataType]: [],
  };
  const db = new Low(new JSONFile(store.file));
  if (!fs.existsSync(store.file)) {
    fs.writeFileSync(store.file, JSON.stringify(store));
  }
  return db;
}
