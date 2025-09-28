#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Shabz Fazl Website...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `# Email Configuration
# Replace these with your actual email credentials

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=3000
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created! Please update it with your email credentials.\n');
} else {
    console.log('✅ .env file already exists.\n');
}

console.log('📋 Next steps:');
console.log('1. Update .env file with your email credentials');
console.log('2. Run: npm install');
console.log('3. Run: npm start');
console.log('4. Open: http://localhost:3000\n');

console.log('📧 For Gmail setup:');
console.log('1. Enable 2-Factor Authentication');
console.log('2. Generate App Password: Google Account → Security → 2-Step Verification → App passwords');
console.log('3. Use the app password in your .env file\n');

console.log('🎉 Setup complete! Your website is ready to go.');
