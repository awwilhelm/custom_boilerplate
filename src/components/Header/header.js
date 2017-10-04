import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { parse } from 'query-string';
import map from '../../services/map';
import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { home, about, contactUs } from '../../constants/pathnames';

function getGenreLink(genre) {
  return `${about} '?genre=' + ${genre}`;
}

getGenreLink.propTypes = {
  genre: PropTypes.string.isRequired,
};

function Logo({ genre }) {
  return (
    <div>
      <Link to={home}>
        <h1>Favesound</h1>
      </Link>
    </div>
  );
}

Logo.propTypes = {
  genre: PropTypes.string.isRequired,
};

function MenuItem({ selectedGenre, genre }) {
  const linkClass = classNames(
    'menu-item',
    {
      'menu-item-selected': genre === selectedGenre,
    },
  );

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
}

MenuItem.propTypes = {
  selectedGenre: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

function Login({ onLogin }) {
  return (
    <Link onClick={onLogin} to={contactUs}>
      Login
    </Link>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

function Logout({ onLogout }) {
  return (
    <Link onClick={onLogout} to={about}>
      Logout
    </Link>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

function SessionAction({ currentUser = null, onLogin, onLogout }) {
  return (
    <div>
      {currentUser ? <Logout onLogout={onLogout} /> : <Login onLogin={onLogin} />}
    </div>
  );
}

SessionAction.propTypes = {
  currentUser: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
SessionAction.defaultProps = {
  currentUser: null,
};

function MenuList({ selectedGenre }) {
  return (
    <div>
      {map((genre, idx) => {
        const menuItemProps = { genre, selectedGenre };
        return <MenuItem key={idx} {...menuItemProps} />;
      }, GENRES)}
    </div>
  );
}

MenuList.propTypes = {
  selectedGenre: PropTypes.func.isRequired,
};

const Header = inject('sessionStore')(
  observer(({ location, sessionStore }) => {
    const genre = parse(location.search).genre || DEFAULT_GENRE;
    return (
      <div className="header">
        <div className="header-content">
          <Logo genre={genre} />
          <Route exact path={about} render={() => <MenuList selectedGenre={genre} />} />
          <SessionAction
            currentUser={sessionStore.user}
            onLogin={actions.login}
            onLogout={actions.logout}
          />
        </div>
      </div>
    );
  }));

Header.wrappedComponent.propTypes = {
  sessionStore: PropTypes.shape({
    user: PropTypes.string,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

export default withRouter(Header);
