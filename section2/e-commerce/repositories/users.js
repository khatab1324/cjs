const fs = require("fs");
const crypto = require("crypto");
class UsersRepositories {
  constructor(filename) {
    if (!filename) {
      throw new Error("you forget to creat repositories that require filename");
    }
    this.filename = filename;
    try {
      //check if there file have the same name
      fs.accessSync(filename); //if you want to know why we use accessSync not access watch 362
    } catch {
      //make new file
      fs.writeFileSync(filename, "[]");
    }
  }
  async getAll() {
    //open file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    ); //the second agrument is optional you can remove it

    //parse the contents
    // const data = JSON.parse(contents);
    // // Ruturn the pares data
    // return data;
  }
  async create(attrs) {
    attrs.id = this.randomeId();
    // before creating file we should call all the file
    const records = await this.getAll();
    records.push(attrs); //push the new file

    await this.writeAll(records);
  }

  async writeAll(records) {
    //write the updated 'records' array back to filename
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2) //the second agrument for custom formatter but we don't need it becuase that we put null
      //the thierd argument it designation the level indentation we need in json that make look batter
    ); //second agrument that we want to store in our data as string
  }
  randomeId() {
    //we make this id to control in json like delete
    return crypto.randomBytes(4).toString("hex"); //this make randomId and add it in json
  }
  async getOne(id) {
    const records = await this.getAll(); //we difine it again because it wan in deffrint scope
    return records.find((records) => records.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((records) => records.id !== id); //when the id ===id that will guve us false and fileter accept just true that mean every thing is true will go but false will is bypassed
    await this.writeAll(filteredRecords);
  }
  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`); //we put error in update because if id undifine that mean there is very wrong , there is id messing
    }
    Object.assign(record, attrs); //it will take every key and value in attrs and copy them in record
    await this.writeAll(records);
  }
  async getOneBy(filter) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filter) {
        if (record[key] !== filter[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}
module.exports = new UsersRepositories("./users.json");
