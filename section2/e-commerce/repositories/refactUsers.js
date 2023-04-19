// const fs = require("fs");
// const crypto = require("crypto");
// const util = require("util");
// const scrypt = util.promisify(crypto.scrypt);
// class UsersRepositories {
//   constructor(filename) {
//     if (!filename) {
//       throw new Error("you forget to creat repositories that require filename");
//     }
//     this.filename = filename;
//     try {
//       fs.accessSync(filename);
//     } catch {
//       fs.writeFileSync(filename, "[]");
//     }
//   }
//   async getAll() {
//     return JSON.parse(await fs.promises.readFile(this.filename)); //the second agrument is optional you can remove it
//   }
//   async create(attrs) {
//     attrs.id = this.randomeId();

//     const salt = crypto.randomBytes(8).toString("hex");
//     const hashed = await scrypt(attrs.password, salt, 64);
//     const records = await this.getAll();
//     const record = { ...attrs, password: `${hashed.toString("hex")}.${salt}` };
//     await this.writeAll(records);
//     return record;
//   }
//   async comparePassword(saved, supplied) {
//     const [hashed, salt] = saved.split(".");
//     const hashedSuppliedbuffer = await scrypt(supplied, salt, 64);
//     return hashed === hashedSuppliedbuffer.toString("hex");
//   }

//   async writeAll(records) {
//     await fs.promises.writeFile(
//       this.filename,
//       JSON.stringify(records, null, 2)
//     );
//   }
//   randomeId() {
//     return crypto.randomBytes(4).toString("hex");
//   }
//   async getOne(id) {
//     const records = await this.getAll();
//     return records.find((records) => records.id === id);
//   }
//   async delete(id) {
//     const records = await this.getAll();
//     const filteredRecords = records.filter((records) => records.id !== id);
//     await this.writeAll(filteredRecords);
//   }
//   async update(id, attrs) {
//     const records = await this.getAll();
//     const record = records.find((record) => record.id === id);
//     if (!record) {
//       throw new Error(`Record with id ${id} not found`);
//     }
//     Object.assign(record, attrs);
//     await this.writeAll(records);
//   }
//   async getOneBy(filter) {
//     const records = await this.getAll();
//     for (let record of records) {
//       let found = true;
//       for (let key in filter) {
//         if (record[key] !== filter[key]) {
//           found = false;
//         }
//       }
//       if (found) {
//         return record;
//       }
//     }
//   }
// }
// module.exports = new UsersRepositories("users.json");
