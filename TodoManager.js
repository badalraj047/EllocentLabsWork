const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });
const p = (q) => new Promise((r) => rl.question(q, r));

class TM {
  constructor() {
    this.t = [];
    this.i = 1;
  }
  a(x) {
    if (typeof x !== "string" || !x.trim()) throw new Error("Invalid");
    const o = { id: this.i++, title: x.trim(), completed: false };
    this.t.push(o);
    return o;
  }
  d(id) {
    const k = this.t.findIndex(v => v.id === id);
    if (k < 0) return false;
    this.t.splice(k, 1);
    return true;
  }
  g(id) {
    const o = this.t.find(v => v.id === id);
    if (!o) return null;
    o.completed = !o.completed;
    return o;
  }
  c() { return this.t.filter(v => v.completed); }
  n() { return this.t.filter(v => !v.completed); }
  l() { return this.t; }
}

(async function () {
  const m = new TM();

  console.log("Enter choice:");
  console.log("1 Add Task");
  console.log("2 Remove Task");
  console.log("3 Toggle Complete");
  console.log("4 List Completed");
  console.log("5 List Pending");
  console.log("6 List All");

  const ch = (await p("Your choice: ")).trim();

  try {
    if (ch === "1") {
      const x = await p("Enter task title: ");
      console.log("Added:", m.a(x));
    } else if (ch === "2") {
      const id = Number((await p("Enter task id to remove: ")).trim());
      console.log(m.d(id) ? "Removed" : "Task not found");
    } else if (ch === "3") {
      const id = Number((await p("Enter task id to toggle: ")).trim());
      const r = m.g(id);
      console.log(r ? "Updated: " + JSON.stringify(r) : "Task not found");
    } else if (ch === "4") {
      console.log("Completed tasks:", m.c());
    } else if (ch === "5") {
      console.log("Pending tasks:", m.n());
    } else if (ch === "6") {
      console.log("All tasks:", m.l());
    } else {
      console.log("Invalid choice");
    }
  } catch (e) {
    console.log("Error:", e.message);
  } finally {
    rl.close();
  }
})();
