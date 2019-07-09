module.exports = function (io, interval) {
    const edge = require('edge-js');

    io.on('connection', (socket) => {
        let dataIntervals = [];
        socket.on('reg-tag', (tag) => {
            console.log("Socket:" + socket.id + ":  Registered tag: " + tag.name);
            let dataInterval = setInterval(() => {
                getTagValue(tag.name, (error, result) => {
                    if (error) {
                        socket.emit('wincc-error', error);
                        return;
                    }
                    console.log("Socket:" + socket.id + ":  Sending data for tag: " + tag.name + " = " + result);
                    socket.emit('new-tag-value', {...tag, ...{value: Number(result)}});
                });
            }, interval);
            dataIntervals.push(dataInterval);
            console.log("Now we have # intervals " + dataIntervals.length);
        });

        socket.on('disconnect', () => {
            console.log("Socket:" + socket.id + ":  Disconnect on socket");
            console.log("# intervals that will be cleared " + dataIntervals.length);
            for (let i = 0; i < dataIntervals.length; i++) {
                console.log("Clearing interval # " + i);
                clearInterval(dataIntervals[i]);
            }
        });
    });

    const getTagValue = edge.func(() => {/*
        async (tagName) => {
            System.Type objectType = System.Type.GetTypeFromProgID("WinCC-Runtime-Project");
            object obj = System.Activator.CreateInstance(objectType);
            object val = objectType.InvokeMember("GetValue", System.Reflection.BindingFlags.InvokeMethod,
                                                null, obj, new object[] { tagName });
            return val.ToString();
        }
    */
    });

};