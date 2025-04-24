// Copy of genres from results field of api call to: https://api.rawg.io/api/genres
// this data rarely changes, so we can hardcode it to avoid a network call
// note that the original payload includes a games array for each genre and a games_count field, which I stripped out as it is not used
export default
[
    {
        "id": 4,
        "name": "Action",
        "slug": "action",
        "image_background": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"       
    },
    {
        "id": 51,
        "name": "Indie",
        "slug": "indie",
        "image_background": "https://media.rawg.io/media/games/d0f/d0f91fe1d92332147e5db74e207cfc7a.jpg",
    },
    {
        "id": 3,
        "name": "Adventure",
        "slug": "adventure",
        "image_background": "https://media.rawg.io/media/games/21c/21cc15d233117c6809ec86870559e105.jpg",
    },
    {
        "id": 5,
        "name": "RPG",
        "slug": "role-playing-games-rpg",
        "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
    },
    {
        "id": 10,
        "name": "Strategy",
        "slug": "strategy",
        "image_background": "https://media.rawg.io/media/games/c22/c22d804ac753c72f2617b3708a625dec.jpg",
    },
    {
        "id": 2,
        "name": "Shooter",
        "slug": "shooter",
        "image_background": "https://media.rawg.io/media/games/b49/b4912b5dbfc7ed8927b65f05b8507f6c.jpg",
    },
    {
        "id": 14,
        "name": "Simulation",
        "slug": "simulation",
        "image_background": "https://media.rawg.io/media/screenshots/f2f/f2f3c93d6153da7aee590f3ab8ccd803.jpg",
    },
    {
        "id": 7,
        "name": "Puzzle",
        "slug": "puzzle",
        "image_background": "https://media.rawg.io/media/games/e07/e07737df8469bf32d132ba9eaffc3461.jpg",
    },
    {
        "id": 11,
        "name": "Arcade",
        "slug": "arcade",
        "image_background": "https://media.rawg.io/media/games/238/238e2b2b24c9838626700c69cacf1e3a.jpg",
    },
    {
        "id": 83,
        "name": "Platformer",
        "slug": "platformer",
        "image_background": "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    },
    {
        "id": 59,
        "name": "Massively Multiplayer",
        "slug": "massively-multiplayer",
        "image_background": "https://media.rawg.io/media/games/d9e/d9e868382c48ec98c9b23b8fbe6a2045.jpg",
    },
    {
        "id": 1,
        "name": "Racing",
        "slug": "racing",
        "image_background": "https://media.rawg.io/media/games/0c1/0c1c9965ba59166ab986a663ab2252dc.jpg",
    },
    {
        "id": 15,
        "name": "Sports",
        "slug": "sports",
        "image_background": "https://media.rawg.io/media/games/0c1/0c1c9965ba59166ab986a663ab2252dc.jpg",
    },
    {
        "id": 6,
        "name": "Fighting",
        "slug": "fighting",
        "image_background": "https://media.rawg.io/media/games/35b/35b47c4d85cd6e08f3e2ca43ea5ce7bb.jpg",
    },
    {
        "id": 19,
        "name": "Family",
        "slug": "family",
        "image_background": "https://media.rawg.io/media/games/a87/a8743bdee8627c55bb9f2f01b9136ac1.jpg",
    },
    {
        "id": 28,
        "name": "Board Games",
        "slug": "board-games",
        "image_background": "https://media.rawg.io/media/games/22c/22ce391b3096cd46eadae1a890624f39.jpg",
    },
    {
        "id": 17,
        "name": "Card",
        "slug": "card",
        "image_background": "https://media.rawg.io/media/games/697/697a3eb39ddc26bdaa3e0447c0855f2b.jpg",
    },
    {
        "id": 34,
        "name": "Educational",
        "slug": "educational",
        "image_background": "https://media.rawg.io/media/screenshots/49d/49dae660a0fc843b23d63af8ce34e33c.jpg",
    }
];