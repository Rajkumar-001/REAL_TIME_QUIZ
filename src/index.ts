import { IoManager } from "./managers/IoManager";

const io = IoManager.getIo();

io.listen(3000)

io.on('connection', (client) => {
    client.on('event', data => {
        const _ = data.type;

    })
    client.on('disconnect', () => {

    });

});