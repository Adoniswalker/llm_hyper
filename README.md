

## Setup

1. Ensure all the environmental variables are updated, especially HUGGINGFACE_API_TOKEN. We are using that one to access the model which is running as a software as a service. You can get one here for Read https://huggingface.co/settings/tokens.
2. Run the ```docker compose build && docker compose up``` to build and run the app. You can restart if you face database issues.

## How to use the app

http://127.0.0.1:3000/conversations/ - To get all conversations
http://127.0.0.1:3000/conversations/1 -  To get all text from a given conversation
http://127.0.0.1:3000/conversations/query - To send a query to the server 
```
{
    "model": "mistral", //llama2
    "question": "Which continent is it in?",
    "session_id": "1"
}
```
Session represents the current conversation

