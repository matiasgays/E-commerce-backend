import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing Cart", () => {
  describe("GET: /api/cart - [PUBLIC]", () => {
    it("You are not authorized if you are not an USER or USER_PREMIUM", async function () {
      const { status } = await requester.get("/api/cart");
      expect(status).to.be.eql(401);
    });
  });

  describe("GET: /api/cart/:cid/json - [USER]", () => {
    let cookie;
    let cid;
    it("Must successfully log in as USER and return a cookie", async function () {
      const mockUser = {
        email: "ing.matiasgays@gmail.com",
        password: "123",
      };
      const result = await requester.post("/login").send(mockUser);
      const cookieResult = result.headers["set-cookie"][0];
      expect(cookieResult).to.be.ok;
      cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      expect(cookie.name).to.be.ok.and.eql("mello");
      expect(cookie.value).to.be.ok;
    });

    it("Return all carts and select one ID", async function () {
      const { text } = await requester
        .get("/api/cart")
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      const textJSON = await JSON.parse(text);
      cid = textJSON.payload[0]._id;
    });
    it("Return cart by its ID", async function () {
      const { status } = await requester
        .get(`/api/cart/${cid}/json`)
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      expect(status).to.be.eql(200);
    });
  });

  describe("DELETE: /api/cart/:cid - [USER]", () => {
    let cookie;
    let cid;
    it("Must successfully log in as USER and return a cookie", async function () {
      const mockUser = {
        email: "ing.matiasgays@gmail.com",
        password: "123",
      };
      const result = await requester.post("/login").send(mockUser);
      const cookieResult = result.headers["set-cookie"][0];
      expect(cookieResult).to.be.ok;
      cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      expect(cookie.name).to.be.ok.and.eql("mello");
      expect(cookie.value).to.be.ok;
    });
    it("Create a new cart", async function () {
      const mockCart = {
        products: [
          {
            id: "63de7e8c5eb0e574d5798493",
            quantity: 1,
          },
        ],
      };
      const { _body } = await requester
        .post("/api/cart")
        .send(mockCart)
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      cid = _body.payload._id;
    });
    it("Delete new cart", async function () {
      const { status } = await requester
        .delete(`/api/cart/${cid}`)
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      expect(status).to.be.eql(200);
    });
  });
});
