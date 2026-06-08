/*
 * @file Theme configuration
 */
import { defineConfig } from './src/helpers/config-helper';

export default defineConfig({
  lang: 'en-US',
  site: 'https://slate-blog-demo.vercel.app',
  avatar: '/avatar.png',
  title: 'Obsession Pages',
  description: 'Pure thoughts.',
  lastModified: true,
  readTime: true,
  footer: {
    copyright: '© 2025 Obsession Pages. All rights reserved.',
  },
  socialLinks: [
    {
      icon: 'github',
      link: 'https://github.com/jeromeshaiju'
    },
    {
      icon: 'instagram',
      link: 'https://www.instagram.com/jerome.shaiju/'
    },
    {
      icon: 'link',
      link: 'https://www.linkedin.com/in/jerome-shaiju-k-c-6b18922a5'
    },
]
});