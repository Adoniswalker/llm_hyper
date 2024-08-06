import os

from huggingface_hub import InferenceClient

token = os.environ.get('HUGGINGFACE_API_TOKEN')


def create_client(model_name):
    models = {'llama2': 'meta-llama/Llama-2-7b-chat-hf',
              'mistral': "mistralai/Mistral-7B-Instruct-v0.2"}
    client = InferenceClient(
        models.get(model_name),
        token=token,
    )
    return client


def conversational_model(conversation_history, client):
    ans = ''
    for message in client.chat_completion(
            messages=conversation_history,
            max_tokens=500,
            stream=True,
    ):
        ans += message.choices[0].delta.content
    return ans
