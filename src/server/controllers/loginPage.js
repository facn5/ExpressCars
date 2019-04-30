const path = require("path");

exports.login = res => {
  res
    .status(404)
    .sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        "layouts",
        "loginPageLayout.html"
      )
    );
};
