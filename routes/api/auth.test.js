/* eslint-disable no-undef */
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const app = require("../../app");
const { User } = require("../../models");

const { DB_TEST_HOST, PORT } = process.env;

// eslint-disable-next-line no-undef
describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach(() => {
    User.db.dropCollection("users");
  });

  const password = "1234567";
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  test("test login route", async () => {
    const newUser = {
      email: "chudo5@mail.com",
      password: hashPassword,
    };

    await User.create(newUser);
    const loginUser = {
      email: "chudo5@mail.com",
      password: "1234567",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    const {
      statusCode,
      _body: {
        data: { user, token },
      },
    } = response;
    expect(statusCode).toBe(200);
    expect(token).toBeTruthy();
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("subscription");
    expect(typeof (user.email && user.subscription)).toBe("string");
  });
});
