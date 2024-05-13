from flask import Flask, request, jsonify
import sys
from io import StringIO

app = Flask(__name__)

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data['code']

    # Redirect stdout to capture prints
    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()

    # Safe built-ins dictionary
    safe_builtins = {
        'print': print,
        'range': range,
        'sum': sum,
        'max': max
        # Add other built-in functions you consider safe here
    }

    try:
        # Execute the code in a limited environment
        exec(code, {"__builtins__": safe_builtins})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        # Restore stdout
        sys.stdout = old_stdout

    output = redirected_output.getvalue()
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
