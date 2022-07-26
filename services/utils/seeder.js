'use strict'

const mongoose = require('mongoose')
const MongoDB = require('../mongoDb')
const pokedex = require('../../pokedex.json')
const collectionName = 'pokemons'

async function seedDB(collectionName) {
    const mongodb = new MongoDB()
    await mongodb.connect()
    let collectionObjects = []

    pokedex.map(pokemon => {
        collectionObjects.push({
            id: pokemon.id,
            name: pokemon.name,
            type: pokemon.type,
            HP: pokemon.HP,
            attack: pokemon.attack,
            defense: pokemon.defense,
            SPAttack: pokemon.SPAttack,
            SPDefense: pokemon.SPDefense,
            speed: pokemon.speed,
            image: pokemon.image
        })
    })

    await getCollectionByName(collectionName).insertMany(collectionObjects)
}

function getCollectionByName(collectionName) {
    return mongoose.connection.collection(collectionName)
}

seedDB(collectionName).then(() => {
    console.log('Successfully seeded the database')
    process.exit(0)
});