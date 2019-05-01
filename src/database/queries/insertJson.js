  const query = require("./queries.js");
  const carsdata = require('../carsData.json');

  //const getCars = (cb,name,miles_per_Gallon,cylinders,displacement,horsepower,weight_in_lbs,acceleration,year,origin)
for(let i=1 ; i<carsdata.length; i++){

  query.insert("INSERT INTO CARS (name,miles_per_gallon,cylinders,displacement,horsepower,weight_in_lbs,acceleration,year,origin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",
  [carsdata[i].Name,carsdata[i].Miles_per_Gallon,carsdata[i].Cylinders,carsdata[i].Displacement,carsdata[i].Horsepower,carsdata[i].Weight_in_lbs,carsdata[i].Acceleration,carsdata[i].Year,carsdata[i].Origin],(err,res) => {
    if( err ) console.log(err);
  }
)

}
  // module.exports = {
  //   getCars,
  //   getUsernamePassword: getPasswordWhereUsernameEqualsArg1
  // };
