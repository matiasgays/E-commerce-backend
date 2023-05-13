import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing Session", () => {
  describe("GET: /api/sessions - [PUBLIC]", () => {
    it("You are not authorized if you are not an USER or USER_PREMIUM or ADMIN", async function () {
      const { status } = await requester.get("/api/sessions");
      expect(status).to.be.eql(404);
    });
  });

  describe("GET: /api/sessions - [ADMIN]", () => {
    let cookie;
    it("Must successfully log in as ADMIN and return a cookie", async function () {
      const mockUser = {
        email: "admincoder@gmail.com",
        password: "1234",
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

    it("You are an ADMIN", async function () {
      const { _body } = await requester
        .get("/sessions/current")
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
      expect(_body.role).to.be.eql("ADMIN");
    });
  });

  describe("GET: /api/sessions/current - [PUBLIC]", () => {
    it("You are not authorized if you are not an USER or USER_PREMIUM or ADMIN", async function () {
      const { status } = await requester.get("/api/sessions/current");
      expect(status).to.be.eql(404);
    });
  });
});
