import currentFetch from "weatherApp/src/script.js";
import flip from "weatherApp/src/script.js";

describe("Checking validity of dates/days", () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  test("Make sure var today has correct quantity of digits", () => {
    let value = today.toString().length;

    expect(value).toBe(10);
  });
});

describe("", () => {
  test("", () => {
      expect(currentFetch).toHa
  });
});
