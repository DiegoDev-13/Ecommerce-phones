import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

export const navbarLinks = [
    {
        id: 1,
        title: 'Inicio',
        href: '/'
    },
    {
        id: 2,
        title: 'Celulares',
        href: '/celulares'
    },
    {
        id: 3,
        title: 'Sobre Nosotros',
        href: '/nosotros'
    },
]

export const socialLinks = [
    {
        id: 1,
        title: 'Facebook',
        href: 'https://www.facebook.com',
        icon: <FaFacebook />
    },
    {
        id: 2,
        title: 'Twitter',
        href: 'https://www.twitter.com',
        icon: <FaTwitter />
    },
    {
        id: 3,
        title: 'Instagram',
        href: 'https://www.instagram.com',
        icon: <FaInstagram />
    },
    {
        id: 4,
        title: 'Tiktok',
        href: 'https://www.tiktok.com',
        icon: <FaTiktok />
    },
]