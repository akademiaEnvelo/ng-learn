const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const envFile = `
export const environment = {
  SECRET: "${process.env.SECRET}"
};
`;

fs.writeFile("./src/environment.ts", envFile, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log("File environment.ts created:");
  console.log(envFile);
});
