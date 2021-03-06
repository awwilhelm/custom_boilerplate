import Cookies from 'js-cookie';
import { CLIENT_ID } from '../constants/authentication';

export function unauthApiUrl(url, symbol) {
  return `//api.soundcloud.com/${url}${symbol}client_id=${CLIENT_ID}`;
}

export function apiUrl(url, symbol) {
  const accessToken = Cookies.get('accessToken');

  if (!accessToken) { // Fallback
    return unauthApiUrl(url, symbol);
  }

  return `//api.soundcloud.com/${url}${symbol}oauth_token=${accessToken}`;
}

export function addAccessTokenWith(url, symbol) {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    return `${url}${symbol}oauth_token=${accessToken}`;
  }
  return `${url}${symbol}client_id=${CLIENT_ID}`;
}

export function getLazyLoadingUsersUrl(user, nextHref, initHref) {
  function getUrlPrefix(u) {
    return u ? `users/${u.id}` : 'me';
  }

  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  }
  return apiUrl(`${getUrlPrefix(user)}/${initHref}`, '&');
}

export function getLazyLoadingCommentsUrl(nextHref, initHref) {
  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  }
  return apiUrl(initHref, '&');
}
