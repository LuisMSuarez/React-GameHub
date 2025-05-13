// Copy of genres from results field of api call to: https://api.rawg.io/api/genres
// this data rarely changes, so we can hardcode it to avoid a network call
// note that the original payload includes a games array for each genre and a games_count field, which I stripped out as it is not used
export default
[
    {
      "id": 4,
      "name": "Action",
      "slug": "action",
      "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
    },
    {
      "id": 51,
      "name": "Indie",
      "slug": "indie",
      "image_background": "https://media.rawg.io/media/games/58a/58ac7f6569259dcc0b60b921869b19fc.jpg"
    },
    {
      "id": 3,
      "name": "Adventure",
      "slug": "adventure",
      "image_background": "https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg"
    },
    {
      "id": 5,
      "name": "RPG",
      "slug": "role-playing-games-rpg",
      "image_background": "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg"
    },
    {
      "id": 10,
      "name": "Strategy",
      "slug": "strategy",
      "image_background": "https://media.rawg.io/media/games/fd9/fd92f105dcd6491bc5d61135033d1f19.jpg"
    },
    {
      "id": 2,
      "name": "Shooter",
      "slug": "shooter",
      "image_background": "https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg"
    },
    {
      "id": 40,
      "name": "Casual",
      "slug": "casual",
      "image_background": "https://media.rawg.io/media/screenshots/4f4/4f4722571e32954af43a4508607c1748.jpg"
    },
    {
      "id": 14,
      "name": "Simulation",
      "slug": "simulation",
      "image_background": "https://media.rawg.io/media/games/651/651ae84f2d5e36206aad90976a453329.jpg"
    },
    {
      "id": 7,
      "name": "Puzzle",
      "slug": "puzzle",
      "image_background": "https://media.rawg.io/media/screenshots/6fe/6fe228662a253cd929cc78a103541ee0.jpg"
    },
    {
      "id": 11,
      "name": "Arcade",
      "slug": "arcade",
      "image_background": "https://media.rawg.io/media/games/238/238e2b2b24c9838626700c69cacf1e3a.jpg"
    },
    {
      "id": 83,
      "name": "Platformer",
      "slug": "platformer",
      "image_background": "https://media.rawg.io/media/games/718/71891d2484a592d871e91dc826707e1c.jpg"
    },
    {
      "id": 59,
      "name": "Massively Multiplayer",
      "slug": "massively-multiplayer",
      "image_background": "https://media.rawg.io/media/games/596/596a48ef3b62b63b4cc59633e28be903.jpg"
    },
    {
      "id": 1,
      "name": "Racing",
      "slug": "racing",
      "image_background": "https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg"
    },
    {
      "id": 15,
      "name": "Sports",
      "slug": "sports",
      "image_background": "https://media.rawg.io/media/games/8f3/8f306808c45a4dbe0cd698e0b142af08.jpg"
    },
    {
      "id": 6,
      "name": "Fighting",
      "slug": "fighting",
      "image_background": "https://media.rawg.io/media/screenshots/ad1/ad15e71b0a3d431ce0a59bcd783efa88.jpg"
    },
    {
      "id": 19,
      "name": "Family",
      "slug": "family",
      "image_background": "https://media.rawg.io/media/screenshots/2b4/2b47c5edfeea2970eeb44d1f8cbd562d.jpg"
    },
    {
      "id": 28,
      "name": "Board Games",
      "slug": "board-games",
      "image_background": "https://media.rawg.io/media/screenshots/60e/60ef1b1853c35da13bc2ca9cbd1c0539.jpeg"
    },
    {
      "id": 17,
      "name": "Card",
      "slug": "card",
      "image_background": "https://media.rawg.io/media/screenshots/fbd/fbdca928fdd7439cba68443cf4d8c6c1.jpg"
    },
    {
      "id": 34,
      "name": "Educational",
      "slug": "educational",
      "image_background": "https://media.rawg.io/media/screenshots/49d/49dae660a0fc843b23d63af8ce34e33c.jpg"
    }
  ];