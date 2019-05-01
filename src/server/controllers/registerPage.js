
exports.page = res => {
  const endObject = {
    msg: "Users need to login to access this part of the website",
    color: "black"
  };
  res.render("layouts/registerPageLayout", endObject);
};

exports.register = (req, res) => {

}
