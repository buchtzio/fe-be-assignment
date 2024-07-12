"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCharacter = exports.serachByName = exports.getCharacters = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const apiUrl = config_1.default.get('RICK_AND_MORTY_API_URL');
let localCharacters = [];
const fetchAllCharactersFromAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${apiUrl}/character`);
    return response.data.results.map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        origin: character.origin,
        location: character.location,
        image: character.image,
    }));
});
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characters = yield fetchAllCharactersFromAPI();
        const mergedCharacters = characters.map((character) => {
            const localCharacter = localCharacters.find((c) => c.id === character.id);
            return localCharacter ? Object.assign(Object.assign({}, character), localCharacter) : character;
        });
        res.json(mergedCharacters);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getCharacters = getCharacters;
const serachByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const characters = yield fetchAllCharactersFromAPI();
        const mergedCharacters = characters.map((character) => {
            const localCharacter = localCharacters.find((c) => c.id === character.id);
            return localCharacter ? Object.assign(Object.assign({}, character), localCharacter) : character;
        });
        const filteredCharacters = mergedCharacters.filter((character) => character.name.toLowerCase().includes(name.toLowerCase()));
        res.json(filteredCharacters);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.serachByName = serachByName;
const updateCharacter = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const updatedData = req.body;
    const existingCharacterIndex = localCharacters.findIndex((c) => c.id === parseInt(id));
    if (existingCharacterIndex !== -1) {
        localCharacters[existingCharacterIndex] = Object.assign(Object.assign({}, localCharacters[existingCharacterIndex]), updatedData);
    }
    else {
        localCharacters.push(Object.assign({ id: parseInt(id) }, updatedData));
    }
    res.json({ message: 'Character updated', character: localCharacters.find((c) => c.id === parseInt(id)) });
};
exports.updateCharacter = updateCharacter;
