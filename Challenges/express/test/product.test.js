import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");
let cookie;

describe("Testing Products", () => {
  describe("GET: /api/products - [USER]", () => {
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

    it("Return all products", async function () {
      const { status } = await requester
        .get("/api/products")
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      expect(status).to.be.eql(200);
    });

    describe("GET: /api/products/:pid - [USER]", () => {
      let pid;
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

      it("Return all products and select one ID", async function () {
        const { text } = await requester
          .get("/api/products")
          .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        const textJSON = await JSON.parse(text);
        pid = textJSON.payload.docs[0]._id;
      });
      it("Return a product by its ID", async function () {
        const { _body } = await requester
          .get(`/api/products/${pid}`)
          .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(_body.status).to.be.eql(200);
      });
    });
    describe("POST: /api/products/:pid - [USER]", () => {
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

      it("You must be an USER PREMIUM or an ADMIN in order to create a product", async function () {
        const { _body } = await requester
          .get("/sessions/current")
          .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(_body.role).to.be.eql("USER_PREMIUM");
      });

      it("Create new Product", async function () {
        const mockProduct = {
          title: "jacket",
          description: "black&white",
          price: 300,
          thumbnail: "/images/trainer.jpg",
          code: 10022154324234312,
          stock: 24,
          status: true,
          category: "shoes",
        };
        const { _body } = await requester
          .post("/api/products")
          .send(mockProduct)
          .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(_body.status).to.be.eql(200);
      });
    });
  });
});
