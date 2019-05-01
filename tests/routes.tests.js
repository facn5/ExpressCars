const supertest = require("supertest");
const tape = require("tape");
const app = require("../src/server/app");

tape("homepage endpoint", t => {
  supertest(app)
    .get("/")
    .expect(200)
    .end(function(err, res) {
      t.equal(res.statusCode, 302, `/ route redirects you to the home route`);
      t.end();
    });
});

tape("homepage endpoint", t => {
  supertest(app)
    .get("/home")
    .expect(200)
    .end(function(err, res) {
      t.equal(res.statusCode, 200, `homepage endpoint redirects the user when he is not authenticated`);
      t.end();
    });
});
tape.onFinish(() => process.exit(0));
