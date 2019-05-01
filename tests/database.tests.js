const supertest = require("supertest");
const tape = require("tape");
const sql = require('src/database/queries/sql');

tape("homepage endpoint", t => {
  supertest(app)
    .get("/")
    .expect(200)
    .end(function(err, res) {
      t.equal(res.statusCode, 302, `/ route redirects you to the home route`);
      t.end();
    });
});

tape.onFinish(() => process.exit(0));
