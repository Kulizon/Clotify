import mixColors from "./data/mixColors";
import hostUrl from "./data/hostUrl";

const generateMix = async (songs, i) => {
  const selectedSongs = [];
  const selectedIndexes = [];
  let authors = [];

  // Select random songs
  for (let n = 0; n < 10; n++) {
    const r = Math.floor(Math.random() * songs.length);
    if (selectedIndexes.includes(r)) continue;
    if (authors.length < 4) {
      selectedSongs.push(songs[r]);
      selectedIndexes.push(r);
      authors.push(songs[r].author);
      continue;
    }

    if (authors.length === 4) {
      if (authors.includes(songs[r].author)) {
        selectedSongs.push(songs[r]);
        selectedIndexes.push(r);
      }
    }
  }

  authors = authors.filter((val, index, self) => self.indexOf(val) === index);

  let desc = [];
  let c = 0;
  while (c < authors.length && c < 3) {
    desc = desc + `${authors[c]}, `;
    c++;
  }

  let r;
  let authorUrl = "";
  while (true) {
    r = Math.floor(Math.random() * songs.length);
    if (authors.includes(songs[r].author)) {
      authorUrl = songs[r].authorID;
      break;
    }
  }

  const authorResponse = await fetch(`${hostUrl}/authors/` + authorUrl);
  const authorResult = await authorResponse.json();

  const today = new Date();

  return {
    num: i + 1,

    name: `Daily Mix ${i + 1}`,
    image: authorResult.image,
    type: "mix",
    description: `${desc.substring(0, desc.length - 2)} and more`,
    songs: selectedSongs,
    date: today,
    mixColor: mixColors[Math.floor(Math.random() * mixColors.length)],
    _id: i + 1,
  };
};

export default generateMix;
