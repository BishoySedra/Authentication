import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export async function comparePassword(password, hashedPassword) {
    try {
        const validPassword = await bcrypt.compare(password, hashedPassword);
        return validPassword;
    } catch (error) {
        console.log(error);
    }
}