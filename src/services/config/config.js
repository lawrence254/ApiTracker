import DB from '../lib/tiny-idb';
export const DB_NAME = "ApiKeys";
export const _store = "keys"

export var randomKey = (Math.random() + 1).toString(36).substring(7);

export async function setUpDatabase() {
    // "use strict";

    return await DB.createDB(DB_NAME, 1, [
        // list of object stores to create after the DB is created
        {
            // name of first object store
            name: _store,

            // keyOptions of the object store
            config: { keyPath: "keyID" },
        },
    ]);
}

// function to get all meals in the DB
// async function getAllKeysFromDB() {
//     // now, initialise the database
//     await setUpDatabase();

//     // open the database & grab the database object
//     let db = await DB.openDB("MenuDatabase", 1);

//     // create a transaction on the db
//     // and retrieve the object store
//     const menuStore = await DB.transaction(
//         db, // transaction on our DB
//         ["menu"], // object stores we want to transact on
//         "readwrite" // transaction mode
//     ).getStore("menu"); // retrieve the store we want

//     // grab all meals from the menuStore
//     let allMeals = await DB.getAllObjectData(menuStore);

//     // update the state with the grabbed data
//     return allMeals;
// }

// // using our suspender here
// const resource = suspender(getAllKeysFromDB());