from flask import Flask, request
app = Flask(__name__)

@app.route("/api/form", methods=['GET', 'POST'])
def form():
    if request.method == "GET":
        return "<p>Hello, World!</p>"
    return "<p>Posting</p>"