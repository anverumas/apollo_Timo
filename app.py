from flask import Flask, request, redirect, session, render_template_string
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "change-this-to-a-random-secret-key"

# Demo database
users = {}


REGISTER_PAGE = """
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

    {% if error %}
        <p style="color:red;">{{ error }}</p>
    {% endif %}
</body>
</html>
"""


@app.route("/")
def home():
    if "username" in session:
        return f"""
            <h1>Welcome, {session['username']}!</h1>
            <p>You are logged in.</p>
            <a href="/logout">Log out</a>
        """

    return '<h1>Home</h1><a href="/login">Log in</a>'


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]

        if username in users:
            return render_template_string(
                REGISTER_PAGE,
                error="Username already exists."
            )

        if len(password) < 8:
            return render_template_string(
                REGISTER_PAGE,
                error="Password must be at least 8 characters."
            )

        # Never store the actual password
        users[username] = generate_password_hash(password)

        return redirect("/login")

    return render_template_string(REGISTER_PAGE, error=None)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]

        stored_password = users.get(username)

        if stored_password and check_password_hash(
            stored_password,
            password
        ):
            session["username"] = username
            return redirect("/")

        return render_template_string(
            LOGIN_PAGE,
            error="Invalid username or password."
        )

    return render_template_string(LOGIN_PAGE, error=None)


@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect("/login")


if __name__ == "__main__":
    app.run(debug=True)
