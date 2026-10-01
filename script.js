const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Demo database
const users = {};

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "change-this-to-a-random-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Register page
const REGISTER_PAGE = `
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>
    <h1>Create Account</h1>

    <form method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <br><br>

        <input type="password" name="password" placeholder="Password" required>
        <br><br>

        <button type="submit">Register</button>
    </form>

    <p><a href="/login">Back to login</a></p>

    {{ERROR}}
</body>
</html>
`;

// Login page
const LOGIN_PAGE = `
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>

    <form method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <br><br>

        <input type="password" name="password" placeholder="Password" required>
        <br><br>

        <button type="submit">Login</button>
    </form>

    <p><a href="/register">Create an account</a></p>

    {{ERROR}}
</body>
</html>
`;

// Home
app.get("/", (req, res) => {
  if (req.session.username) {
    return res.send(`
      <h1>Welcome, ${req.session.username}!</h1>
      <p>You are logged in.</p>
      <a href="/logout">Log out</a>
    `);
  }

  res.send('<h1>Home</h1><a href="/login">Log in</a>');
});

// Register
app.route("/register")
  .get((req, res) => {
    res.send(REGISTER_PAGE.replace("{{ERROR}}", ""));
  })
  .post(async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password;

    if (users[username]) {
      return res.send(
        REGISTER_PAGE.replace(
          "{{ERROR}}",
          '<p style="color:red;">Username already exists.</p>'
        )
      );
    }

    if (password.length < 8) {
      return res.send(
        REGISTER_PAGE.replace(
          "{{ERROR}}",
          '<p style="color:red;">Password must be at least 8 characters.</p>'
        )
      );
    }

    // Never store the actual password
    const hashedPassword = await bcrypt.hash(password, 12);

    users[username] = hashedPassword;

    res.redirect("/login");
  });

// Login
app.route("/login")
  .get((req, res) => {
    res.send(LOGIN_PAGE.replace("{{ERROR}}", ""));
  })
  .post(async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password;

    const storedPassword = users[username];

    if (
      storedPassword &&
      await bcrypt.compare(password, storedPassword)
    ) {
      req.session.username = username;
      return res.redirect("/");
    }

    res.send(
      LOGIN_PAGE.replace(
        "{{ERROR}}",
        '<p style="color:red;">Invalid username or password.</p>'
      )
    );
  });

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_MYSQL_PASSWORD",
  database: "film_database"
});

app.get("/films", async (req, res) => {
  try {
    const [films] = await db.query(
      "SELECT * FROM films ORDER BY title"
    );

    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});