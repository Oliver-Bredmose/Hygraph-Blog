import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react'
import { request } from 'graphql-request'
import { getSingleBlog } from './Components/hygraph-fetch'
import './App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Grid, Switch } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', { backgroundColor: '#8796A5' }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', { backgroundColor: '#3a3a3a' }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', { backgroundColor: '#ffffff' }),
  },
}));

function App() {
  const [data, setData] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
  },
})

  useEffect(() => {
  const graphqlfetch = async () => {
    try {
      const result = await request(import.meta.env.VITE_PUBLIC_URL, getSingleBlog)
      setData(result)
    } catch (error) {
      console.error(error)
    }
  }
  graphqlfetch()
}, [])

  const blogs = data ? data.blogs.map((blog, index) => {
    return (
      <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <CardMedia
          component="img"
          height="140"
          image={blog.image.url}
          alt={blog.headline}
          />
        <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        <h2>{blog.headline}</h2>
      </Typography>
      <li key={index}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{blog.textContent?.text}</Typography> <br />

        <Typography variant='body2'> {blog.author} </Typography>

        <Typography variant='body2'> {new Date(blog.date).getDate()}/{new Date(blog.date).getMonth()}/{new Date(blog.date).getFullYear()}    {new Date(blog.date).getUTCHours()}:{new Date(blog.date).getMinutes()}</Typography>
      </li>
        </CardContent>
      </CardActionArea>
      </Card>
      </Grid>
    )
  }) : []

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <MaterialUISwitch
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ px: 2 }}>
        {blogs}
      </Grid>
    </ThemeProvider>
  )
}

export default App