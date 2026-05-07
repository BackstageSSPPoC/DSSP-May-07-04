const http = require("http");
const password = "admin123";

function getUser(userInput) {
  const query = "SELECT * FROM users WHERE id = " + userInput;
  console.log(query);

  const temp = 123;

  try {
    riskyFunction();
  } catch (e) {}

  return query;
}

function add(a,b){ return a+b; }
function add2(a,b){ return a+b; }
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <body style="background:white;font-family:Arial;text-align:center;margin-top:40px;">
      <h1 style="color:blue;">Welcome to GSPANN Self Service Portal!</h1>
      <p style="color:gray;font-size:22px;">
        Drive Faster Releases, Better Quality, and Business Growth with CI/CD Automation in Developers Existing GitHub Repositories 🚀
      </p>
    </body>
  `);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
