import generateMix from "./generateMix";
import { userActions } from "../store/user";
import hostUrl from "./data/hostUrl";

const generateDailyMixes = async (dispatch, userPlaylists, userID) => {
  let prevDate;
  for (let i = 0; i < userPlaylists.length; i++) {
    if (userPlaylists[i].type === "mix") {
      prevDate = userPlaylists[i].date;
      break;
    }
  }

  const today = new Date();
  const lastDate = new Date(prevDate);

  if (today.getTime() < lastDate.getTime() + 24 * 60 * 60 * 1000) return;

  const response = await fetch(`${hostUrl}/songs`);
  const result = await response.json();

  const playlists = [];
  for (let i = 0; i < 6; i++) {
    const mix = await generateMix(result, i);
    playlists.push(mix);
  }

  dispatch(userActions.setMixes(playlists));

  await fetch(`${hostUrl}/users/${userID}/playlists/mixes`, {
    method: "POST",
    body: JSON.stringify(playlists),
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export default generateDailyMixes;
