# Professor Bot

## Purpose
- Professor Bot manages the introductory process, the 'registration', of new users. Initially it will only serve as a way to
assign basic roles as well as give the new players their first pokemon. In the future, this bot will also be responsible
for all necessary API requests for true registration of users into a database.

## Roles Assignable
- Can assign new users with the 'Trainer' role.

## Prompts

> "Welcome to the world of Pokemon! I'll be your resident pokemon expert, Professor Yew."

> "In the region of <REGION NAME>, many different kinds of pokemon inhabit vast and varied environemnts."

> "It's your job as a pokemon trainer to capture and befriend these pokemon."

> "Before we go any further, please select an avatar."

> "And what should we call you?"

> ""

## Sanity Checks
1. Do you have the proper intents on the intent array?

## TODO:
1. refactor to seperate registration logic from other buttons/slash commands
2. connect to couchbase
3. register user w/ json built from menu selections
4. after registration, assign basic roles (trainer) to user
5. send user to general lobby