import poolPg from "../config/postgreConfig.js";
import fs from "fs";

try {
  // start db connection 
  poolPg
    .connect()
    .then((client) => {
      console.log("Connected to PostgreSQL");
      client.release();
    })

  // drop table if exists
  await poolPg.query(`
    DROP TABLE IF EXISTS city;
  `);

  // create table
  await poolPg.query(`
    CREATE TABLE city (
      id INT PRIMARY KEY,
      name VARCHAR(35) NOT NULL,
      country VARCHAR(2) NOT NULL
    );
  `);

  // read data
  let data = fs.readFileSync("data/cities.json", "utf8");
  data = JSON.parse(data);
  let dataSql = ''
  for(let i = 0; i < data.length; i++) {
    let row = `(${data[i][0]}, '${data[i][1]}', '${data[i][2]}')`;
    if(i !== data.length - 1) row += ',';
    dataSql += '\n' + row;
  }

  // insert record
  await poolPg.query(`
    INSERT INTO city VALUES 
      ${dataSql}
    ;
  `);

  console.log('seed success');
} catch(err) {
  console.log(err);
} finally {
  process.exit(1);
}