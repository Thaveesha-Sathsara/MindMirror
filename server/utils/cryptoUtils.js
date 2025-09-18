import crypto from 'crypto';

// The key will be read from the environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hexadecimal string set in environment variables.');
}

// Convert hex string to a buffer
const key = Buffer.from(ENCRYPTION_KEY, 'hex');
const iv = crypto.randomBytes(16); // Initialization vector for added security

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Store the IV alongside the encrypted text
    return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (text) => {
    // Check if the text is in the expected encrypted format (IV:ciphertext)
    if (!text.includes(':')) {
        // If it's not encrypted, return the plaintext as is
        return text; 
    }
    
    // If it's in the correct format, proceed with decryption
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        // Return a default message or throw an error
        return 'Decryption failed. Data may be corrupted.';
    }
};