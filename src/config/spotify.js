import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
	'user-read-email',
	'user-read-private',
	'user-library-read',
	'user-top-read',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-follow-modify',
	'user-follow-read',
	'playlist-read-private',
	'playlist-read-collaborative',
	'streaming'
].join(',')

const AUTH_ENDPOINT = `https://accounts.spotify.com`;

var AUTH_URL = AUTH_ENDPOINT + '/authorize';
AUTH_URL += '?response_type=code';
AUTH_URL += '&client_id=' + encodeURIComponent(import.meta.env.VITE_SPOTIFY_CLIENT_ID);
AUTH_URL += '&scope=' + encodeURIComponent(scopes);
AUTH_URL += '&redirect_uri=' + encodeURIComponent(window.location.origin);

const spotifyApi = new SpotifyWebApi({
	clientId: import.meta.env.SPOTIFY_CLIENT_ID,
	clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: window.location.origin
})

export { spotifyApi, scopes, AUTH_ENDPOINT, AUTH_URL }