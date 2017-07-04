# War (as in the card game of chance)

This is a client and server side app. The server side app is a redux app that controls the state of the game. 

It consists of two applications in one. A server side application app that runs in node. The server side application is redux with socket.io for accepting and pushing new states.

The client side application uses react and redux for the UI.

## Run Locally

clone repository
```bash
git clone git@github.com:rogperez/war.git
```

run server
```bash
cd war/server
yarn install
yarn start
```

run client app
```bash
cd war/client
yarn install
yarn run dev
```

## Server side app

For a sequence of actions on the server visit [this page](./server/README.md)
