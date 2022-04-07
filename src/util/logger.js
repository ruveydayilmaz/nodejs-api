import logger from 'pino';

const log = logger({
    base: {pid: false},
    trasnport: {
        target: 'pino-pretty',
        options: {
            colorized: true
        },
        timestamp: () => `,"time": "${new Date().toLocaleString()}"`
    }
});

export default log;