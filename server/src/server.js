import Server from 'socket.io';

export default function startServer(store) {
  const port = 8090;
  const io = new Server().attach(port);
  console.log(`Server started on localhost:${port}`);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    console.log('A new connection has happened my dude');
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
