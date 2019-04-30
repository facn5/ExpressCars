const supertest = require("supertest");
const tape = require("tape");
const app = require("../src/server/app");

tape("homepage endpoint", t => {
  supertest(app)
    .get("/")
    .expect(200)
    .end(function(err, res) {
      t.equal(res.status, 200, `homepage endpoint returns 200 status code`);
      t.end();
    });
});
