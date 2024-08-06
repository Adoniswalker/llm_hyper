from marshmallow import Schema, fields, validate


class InputSchema(Schema):
    session_id = fields.Str(required=True)
    model = fields.Str(required=True, validate=validate.OneOf(['llama2', 'mistral']))
    question = fields.Str(required=True)