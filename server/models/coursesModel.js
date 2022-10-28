import fs from "fs";
import { v4 as uuid } from "uuid";

class Course {
  constructor({ title, price, img }) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  save() {
    fs.write("../coursesList.txt");
  }
}

export { Course };
