import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentication';
import { apiUrl } from '../../services/api';
import sessionStore from '../../stores/sessionStore/sessionStore';

function fetchUser() {
  fetch(apiUrl('me', '?'))
    .then(response => response.json())
    .then((me) => {
      sessionStore.setMe(me);
    });
}

export function login() {
  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URI;
  /* eslint-disable no-undef */
  SC.initialize({ clientId, redirectUri });

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
}
