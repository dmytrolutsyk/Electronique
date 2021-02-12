export interface Connection {
    close(callback: (err?: Error) => void): any;
}

export async function closeConnections(connections: Connection[]): Promise<void> {
    const promises = connections.map((connection) => {
        return new Promise<void>((resolve, reject) => {
            connection.close((err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
    await Promise.all(promises);
}