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

console.log('📧 For Outlook Business Email setup:');
console.log('1. Use your business email: your-email@yourdomain.com');
console.log('2. Use your regular email password (or app password if 2FA enabled)');
console.log('3. If 2FA enabled: Microsoft Account → Security → App passwords');
console.log('4. Update the .env file with your credentials\n');

console.log('🎉 Setup complete! Your website is ready to go.');
