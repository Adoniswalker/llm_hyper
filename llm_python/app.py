from flask import Flask, request, jsonify

from src.context_manager import ContextManager
from src.chat_helper import conversational_model, create_client
from src.validators import InputSchema
from marshmallow import ValidationError
input_schema = InputSchema()
app = Flask(__name__)

model_interface = None
session_manager = ContextManager()
client = None


@app.route('/query', methods=['POST'])
def query_model():
    try:
        global client
        # Validate input
        data = input_schema.load(request.json)
        query = data.get('question')
        if not client:
            client = create_client(data.get('model'))
        session_manager.add_query(query)
        response = conversational_model(session_manager.get_context(), client)
        session_manager.add_response(response)

        return jsonify({"response": response})
    except ValidationError as err:
        return jsonify(
            {"message": "Validation error", "errors": err.messages}), 400



