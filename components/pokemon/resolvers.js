const pokemonModel = require('./model')

module.exports = {
    Query: {
        lastPokemons: async (_, args) => {
            return await pokemonModel.getLastPokemons(args.limit)
        },
        pokemons: async () => {
            return await pokemonModel.getAllPokemons()
        },
        pokemonById: async (_, args) => {
            return await pokemonModel.getPokemonById(args.id)
        },
        searchPokemon: async (_, args) => {
            return await pokemonModel.searchPokemon(args.toSearch)
        }
    }
}

