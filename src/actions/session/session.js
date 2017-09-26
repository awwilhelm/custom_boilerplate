import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentication';
import { apiUrl } from '../../services/api';
import sessionStore from '../../stores/sessionStore';

function fetchUser() {
  fetch(apiUrl(`me`, '?'))
    .then((response) => response.json())
    .then((me) => {
      sessionStore.setMe(me);
      fetchActivities();
      fetchFavorites(me);
      fetchFollowings(me);
      fetchFollowers(me);
    });
}

export function login() {
  const client_id = CLIENT_ID;
  const redirect_uri = REDIRECT_URI;
  /* eslint-disable no-undef */
  SC.initialize({ client_id, redirect_uri });

  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token);

    sessionStore.setSession(session);
    fetchUser();
  });
  /* eslint-enable no-undef */
}

export function logout() {
  Cookies.remove(OAUTH_TOKEN);

  sessionStore.reset();
  userStore.reset();
}
