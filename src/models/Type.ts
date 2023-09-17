import { pool } from "..";

export const createTypeTable = async () => {
    const client = await pool.connect();

    try {
        await client.query(`CREATE TABLE IF NOT EXISTS Tipo (
            id SERIAL PRIMARY KEY, 
            nombre VARCHAR(255) NOT NULL,
            img VARCHAR(255) NOT NULL
        );`);
    } finally {
        client.release();
    }
};