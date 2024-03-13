from openai import OpenAI
import json
from dotenv import load_dotenv, find_dotenv
from openai.types.beta import Assistant
from openai.types.beta.thread import Thread
from openai.types.beta.threads.thread_message import ThreadMessage
from openai.types.beta.threads.run import Run

# Read local .env file
_ : bool = load_dotenv(find_dotenv())

# Initialize OpenAI client
client : OpenAI = OpenAI()

# def print_assistant_response(response):
#     for message in response['choices'][0]['message']['content']:
#         print(message['text'])

# Upload a file with an "assistants" purpose
# file = client.files.create(
#   file=open("zia_profile.pdf", "rb"),
#   purpose='assistants'
# )

# print(file)

# Create an assistant
assistant: Assistant = client.beta.assistants.create(
  name="Student Support Assistant",
  instructions="You are a personal histroy tutor. Answer questions briefly, in a sentence or less.",
  model="gpt-3.5-turbo-1106",
  tools=[{"type": "code_interpreter"}],
)

# Create a thread
thread: Thread  = client.beta.threads.create()
print(thread)

# Create a user message
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Tell me the leader who fight too much wars in islamic histroy"
)

# Create a run
run: Run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Please address the user as Pakistani. The user is the student of PIAIC."
)

# Retrieve the run
run: Run = client.beta.threads.runs.retrieve(
  thread_id=thread.id,
  run_id=run.id
)

print(run)

# List and print messages
messages: list[ThreadMessage] = client.beta.threads.messages.list(
  thread_id=thread.id
)

for m in reversed(messages.data):
  print(m.role + ": " + m.content[0].text.value)

# Print assistant's response
# print_assistant_response(run['choices'][0]['message'])


