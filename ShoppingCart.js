const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });
const p = (q) => new Promise((r) => rl.question(q, r));

class ShoppingCart {
  constructor() {
    this.a = [];
    this.d = 0;
  }
  addItem(x, r, q = 1) {
    if (typeof x !== "string" || !x.trim()) throw new Error("Invalid product");
    if (typeof r !== "number" || !Number.isFinite(r) || r < 0) throw new Error("Invalid price");
    if (!Number.isInteger(q) || q <= 0) throw new Error("Invalid quantity");

    const k = x.trim().toLowerCase();
    const e = this.a.find(v => v.x.toLowerCase() === k);
    if (e) {
      e.q += q;
      e.r = r;
      return e;
    }
    const o = { x: x.trim(), r, q };
    this.a.push(o);
    return o;
  }
  removeItem(x) {
    if (typeof x !== "string" || !x.trim()) return false;
    const k = x.trim().toLowerCase();
    const i = this.a.findIndex(v => v.x.toLowerCase() === k);
    if (i < 0) return false;
    this.a.splice(i, 1);
    return true;
  }
  updateQuantity(x, q) {
    if (typeof x !== "string" || !x.trim()) throw new Error("Invalid product");
    if (!Number.isInteger(q) || q < 0) throw new Error("Invalid quantity");
    const k = x.trim().toLowerCase();
    const e = this.a.find(v => v.x.toLowerCase() === k);
    if (!e) return false;
    if (q === 0) return this.removeItem(x);
    e.q = q;
    return e;
  }
  getSubtotal() {
    return this.a.reduce((s, v) => s + v.r * v.q, 0);
  }
  applyDiscount(c) {
    const z = typeof c === "string" ? c.trim().toUpperCase() : "";
    this.d = z === "SAVE10" ? 0.1 : z === "SAVE20" ? 0.2 : 0;
    return this.d;
  }
  getTotal() {
    const s = this.getSubtotal();
    const m = s * this.d;
    const b = s - m;
    const t = b * 0.1;
    return Number((b + t).toFixed(2));
  }
  v() {
    if (!this.a.length) return console.log("Cart is empty");
    console.log("Cart items:", this.a);
    console.log("Subtotal:", this.getSubtotal().toFixed(2));
    console.log("Discount:", (this.d * 100).toFixed(0) + "%");
    console.log("Final total:", this.getTotal().toFixed(2));
  }
}

(async function () {
  const c = new ShoppingCart();

  console.log("Enter choice:");
  console.log("1 Add Item");
  console.log("2 Remove Item");
  console.log("3 Update Quantity");
  console.log("4 Apply Discount");
  console.log("5 Get Subtotal");
  console.log("6 Get Total");
  console.log("7 View Cart");

  const ch = (await p("Your choice: ")).trim();

  try {
    if (ch === "1") {
      const x = await p("Enter product name: ");
      const r = Number((await p("Enter product price: ")).trim());
      const q = Number((await p("Enter quantity: ")).trim());
      console.log("Added/Updated:", c.addItem(x, r, q));
    } else if (ch === "2") {
      const x = await p("Enter product name to remove: ");
      console.log(c.removeItem(x) ? "Removed" : "Product not found");
    } else if (ch === "3") {
      const x = await p("Enter product name: ");
      const q = Number((await p("Enter new quantity (0 to remove): ")).trim());
      console.log(c.updateQuantity(x, q) ? "Updated" : "Product not found");
    } else if (ch === "4") {
      const cd = await p("Enter discount code (SAVE10/SAVE20): ");
      const d = c.applyDiscount(cd);
      console.log(d > 0 ? "Discount applied: " + (d * 100) + "%" : "Invalid code, discount reset");
    } else if (ch === "5") {
      console.log("Subtotal:", c.getSubtotal().toFixed(2));
    } else if (ch === "6") {
      console.log("Final payable amount:", c.getTotal().toFixed(2));
    } else if (ch === "7") {
      c.v();
    } else {
      console.log("Invalid choice");
    }
  } catch (e) {
    console.log("Error:", e.message);
  } finally {
    rl.close();
  }
})();
