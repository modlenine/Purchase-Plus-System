module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/intsys/purchaseplus/' : '/',
    
    // Dev server config
    devServer: {
        port: 8081, // Dev port
        proxy: {
            // Proxy API requests to backend
            '/intranet': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            },
            '/intsys': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            }
        }
    }
}