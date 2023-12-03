import { FacebookIcon, InstagramIcon, TwitterIcon } from "./components/Icons";

const LEFTSIDE_FOOTER_ITEMS = [
    {
        title: 'Legal',
        url: 'https://www.spotify.com/vn-en/legal/end-user-agreement/',
    },
    {
        title: 'Privacy Center',
        url: 'https://www.spotify.com/vn-en/legal/end-user-agreement/',
    },
    {
        title: 'Privacy Policy',
        url: 'https://www.spotify.com/vn-en/legal/end-user-agreement/',
    },
    {
        title: 'Cookies',
        url: 'https://www.spotify.com/vn-en/legal/end-user-agreement/',
    },
    {
        title: 'About ads',
        url: 'https://www.spotify.com/vn-en/legal/end-user-agreement/',
    },
    {
        title: 'Accessibility',
        url: 'https://www.spotify.com/vn-en/legal/end-user-agreement/',
    },
];

const RIGHTSIDE_FOOTER_ITEMS = [
    {
        title: 'Company',
        list: [
            {
                title: 'About',
                url: 'https://www.spotify.com/vn-en/about-us/contact/',
            },
            {
                title: 'Jobs',
                url: 'https://www.lifeatspotify.com/',
            },
            {
                title: 'For the Record',
                url: 'https://newsroom.spotify.com/',
            },
        ],
    },
    {
        title: 'Communities',
        list: [
            {
                title: 'For Artists',
                url: 'https://artists.spotify.com/',
            },
            {
                title: 'Developers',
                url: 'https://developer.spotify.com/',
            },
            {
                title: 'Advertising',
                url: 'https://ads.spotify.com/en-US/',
            },
            {
                title: 'Investors',
                url: 'https://investors.spotify.com/',
            },
            {
                title: 'Vendors',
                url: 'https://spotifyforvendors.com/',
            },
        ],
    },
    {
        title: 'Useful links',
        list: [
            {
                title: 'Support',
                url: 'https://support.spotify.com/',
            },
            {
                title: 'Free Mobile App',
                url: 'https://www.spotify.com/vn-en/free/',
            },
        ],
    },
];

const SOCIAL_MEDIA_ITEMS = [
    {
        title: 'Instagram',
        url: 'https://www.instagram.com/spotify',
        icon: InstagramIcon,
    },
    {
        title: 'Twitter',
        url: 'https://twitter.com/spotify',
        icon: TwitterIcon,
    },
    {
        title: 'Facebook',
        url: 'https://www.facebook.com/SpotifyVietnam/',
        icon: FacebookIcon,
    },
];

export { LEFTSIDE_FOOTER_ITEMS, RIGHTSIDE_FOOTER_ITEMS, SOCIAL_MEDIA_ITEMS };
