import { pool } from "..";

export type TPokemon = {
    nombre: string,
    descripcion: string,
    tipo1: string,
    tipo2?: string,
    evolucion?: string,
    altura: number,
    peso: number,
    img: string
}

export const createPokemonTable = async () => {
    const client = await pool.connect();

    try {
        await client.query(`CREATE TABLE IF NOT EXISTS Pokemon (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion VARCHAR(255) NOT NULL,
            tipo1 INTEGER REFERENCES Tipo(id) NOT NULL,
            tipo2 INTEGER REFERENCES Tipo(id),
            evolucion VARCHAR(255),
            altura NUMERIC(4,1) NOT NULL,
            peso NUMERIC(4,1) NOT NULL,
            img VARCHAR(255) NOT NULL
        );`);
    } finally {
        client.release();
    }
};