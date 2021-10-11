import createServer from './Config/server.js';

const PORT = 8080

export default createServer().then(app => {
    
    app.listen(PORT, () => {
        console.log('Server Started')
        console.log(`Link: http://localhost:${PORT}`)
    });

    return app

});
