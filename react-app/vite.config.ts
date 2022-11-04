/* eslint-disable import/no-extraneous-dependencies */
// @ts-nocheck
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      eslintrc: {
        enabled: true, // <-- this
      },
      dts: './src/auto-imports.d.ts',
      imports: [
        'react', 'mobx', 'mobx-react-lite', 'react-router-dom',
        {
          '@mui/material': [
            'Avatar', 'Typography', 'Stack', 'Chip', 'Icon', 'LinearProgress', 'Slider', 'Box', 'Badge', 'Paper', 'Container', 'Drawer', 'List', 'AppBar', 'Toolbar', 'Divider', 'Button', 'Grid',
            'Menu', 'MenuItem', 'ButtonBase', 'IconButton',
            'Table', 'TableContainer', 'TableHead', 'TableRow', 'TableCell', 'TableBody',
            'TextField', 'InputAdornment',
            'Card', 'CardContent', 'CardActions', 'CardHeader', 'CardMedia', 'CardActionArea',
            'ListItem', 'ListItemAvatar', 'ListItemButton', 'ListItemIcon', 'ListItemText',
            'Fade', 'Slide',
            ['Link', 'MuiLink'],

            'useMediaQuery', 'useTheme',
          ],
          '@mui/icons-material': [
            ['FavoriteBorder', 'FavoriteBorderIcon'],
            ['Favorite', 'FavoriteIcon'],
            ['SkipNext', 'SkipNextIcon'],
            ['SkipPrevious', 'SkipPreviousIcon'],
            ['Pause', 'PauseIcon'],
            ['PlayArrow', 'PlayArrowIcon'],
            ['Shuffle', 'ShuffleIcon'],
            ['Loop', 'LoopIcon'],
            ['Mic', 'MicIcon'],
            ['QueueMusic', 'QueueMusicIcon'],
            ['Cast', 'CastIcon'],
            ['VolumeOff', 'VolumeOffIcon'],
            ['VolumeUp', 'VolumeUpIcon'],
            ['VolumeDown', 'VolumeDownIcon'],
            ['OpenInFull', 'OpenInFullIcon'],
            ['Circle', 'CircleIcon'],
            ['LooksOne', 'LooksOneIcon'],
            ['Home', 'HomeIcon'],
            ['Search', 'SearchIcon'],
            ['VideoLibrary', 'VideoLibraryIcon'],
            ['AddCircle', 'AddCircleIcon'],
            ['Album', 'AlbumIcon'],
            ['Downloading', 'DownloadingIcon'],
            ['PlayCircle', 'PlayCircleIcon'],
            ['PauseCircle', 'PauseCircleIcon'],
            ['PlayCircleFilled', 'PlayCircleFilledIcon'],
            ['Close', 'CloseIcon'],
            ['ArrowDropDown', 'ArrowDropDownIcon'],
            ['ArrowDropUp', 'ArrowDropUpIcon'],
            ['OpenInNew', 'OpenInNewIcon'],
            ['AccessTime', 'AccessTimeIcon'],
            ['MoreHoriz', 'MoreHorizIcon'],
          ],
          // 'react-window': [
          //   'FixedSizeList',
          // ],
          // '@tanstack/react-virtual': [
          //   'useVirtualizer',
          // ],
        },
      ],
      // dirs: ['./src/models/'],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
