class ContextManager:
    def __init__(self):
        self.context = []

    def add_query(self, query):
        self.context.append({"role": "user", "content": query})

    def add_response(self, response):
        self.context.append({"role": "assistant", "content": response})

    def get_context(self):
        return self.context
