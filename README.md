# Blockchain

- [Repository](https://github.com/hivaga/zeply-task)

## How to start

### Commands
* Start frontend in dev mode locally
  * ``npm run start-frontend``
* Start backend in dev mode locally
  * ``npm run start-backend``
* Run unit tests for frontend and backend
  * ``npm run test-all``
* Run e2e test for frontend (headless)
  * ``npm run start-e2e-fronend``
* Run e2e test for frontend (watch mode)
  * ``nx e2e blockchain-e2e --watch``

## Task Requirements 

### Introduction
Hi, thank you for taking on our challenge! We hope that you'll learn a lot, create an awesome
project and join the Zeply team!


In this test we will evaluate your technical skills, namely, code structure, code quality, naming
conventions, knowledge of commonly used frameworks, and overall problem-solving skills.   
Some decisions will be left up to you to make. You can choose any framework and third-party
modules that you feel improve code clarity and development agility, as well as a database
engine of your choice if need be. The task at hand is explained in the following sections.
Whatever is unspecified will be up to you to determine.
### Specifications
In this challenge we want you to build a simple app, using either ReactJS or React Native,
which retrieves address and transaction information from the BTC blockchain. It also allows a
user to subscribe for changes to specific hashes. Each subscribed hash should generate a
notification on the UI. Furthermore, the user should be able to select in which currency the
values should be displayed (USD, EUR or BTC).
### What we'll pay attention to
"The devil is in the detail".


Implementation details, the handling of edge cases, and your coding style are three of the
major things that we value. We'd also love to see automated tests as part of your solution.
Please pay special attention to:

Logic and code complexity - How easy will my code be for it to be maintained by
someone else? Am I using good practices and proper design patterns?

Test coverage - Is my code tested? Are all scenarios considered?

Requirement coverage - Is the application doing what it is meant to be doing?

### Bonus points
Bonus points will be awarded for the implementation of a functionality that retrieves the top 5
searched addresses and transactions.Fields to display for each kind of hash
Address search
* Number of confirmed transaction
* Total BTC receive
* Total BTC spent
* Total BTC unspent
* Current address balance


#### Transaction search
* Transaction hash
* Received time
* Status
* Size (in bytes)

#### Number of confirmations (the successful act of hashing a transaction and adding it to the blockchain)
* Total BTC input
* Total BTC output
* Total fees (paid to process this transaction)
