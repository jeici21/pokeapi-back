import { Request, Response } from "express";
import { pool } from "..";
import { TPokemon } from "../models/Pokemon";

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todos los Pokémon registrados.
 *     responses:
 *       200:
 *         description: Retorna la lista de Pokémon.
 */
export async function getAllPokemonController(req: Request, res: Response) {
    try {
        const { rows } = await pool.query<TPokemon>(`SELECT Pokemon.id, Pokemon.nombre, Pokemon.descripcion, 
            Tipo.img as tipo1, Tipo2.img as tipo2, Pokemon.evolucion, Pokemon.altura, Pokemon.peso, 
            Pokemon.img FROM Pokemon LEFT JOIN Tipo ON Pokemon.tipo1 = Tipo.id
            LEFT JOIN Tipo Tipo2 ON Pokemon.tipo2 = Tipo2.id ORDER BY Pokemon.id;
        `);
        res.json(rows);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Se produjo un error al obtener los pokémon.");
    }
}