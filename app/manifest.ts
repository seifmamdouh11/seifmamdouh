import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Seif Mamdouh | Web Developer Portfolio',
    short_name: 'Seif Mamdouh',
    description: 'Explore the professional portfolio of Seif Mamdouh, a Web Developer based in Cairo, Egypt.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1b23',
    theme_color: '#FF5656',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
