console.log('=== TEST SERVER STARTING ===');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('Express loaded successfully');
console.log('Port:', PORT);
console.log('Resend API Key:', process.env.RESEND_API_KEY ? 'SET' : 'NOT SET');

// Basic middleware
app.use(express.json());

// Simple test endpoint
app.get('/', (req, res) => {
    console.log('Homepage requested');
    res.send('<h1>Server is working!</h1><p>Contact form will be here.</p>');
});

// Test endpoint
app.get('/api/test', (req, res) => {
    console.log('Test endpoint requested');
    res.json({ 
        status: 'OK', 
        message: 'Server is working!',
        timestamp: new Date().toISOString()
    });
});

// Start server
console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 Visit http://localhost:${PORT} to test`);
});

console.log('✅ Server setup complete');
