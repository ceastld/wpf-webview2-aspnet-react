import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Card, CardContent, Grid, Chip, Paper } from '@mui/material';
import TodoApp from './components/TodoApp';
import RealtimeClock from './components/RealtimeClock';
import Navigation from './components/Navigation';
import { TodoContextProvider } from './contexts/TodoContext';
import './App.css'

// 创建 MUI 主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // Tailwind blue-500
    },
    secondary: {
      main: '#8b5cf6', // Tailwind purple-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function Home() {
  return (
    <TodoContextProvider>
      <Box sx={{ p: 3 }}>
        <TodoApp />
      </Box>
    </TodoContextProvider>
  );
}

function Clock() {
  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <RealtimeClock />
    </Box>
  );
}

function About() {
  const technologies = [
    { name: 'WPF', description: 'Desktop application framework', color: '#1976d2' },
    { name: 'WebView2', description: 'Modern web rendering engine', color: '#388e3c' },
    { name: 'ASP.NET Core', description: 'Backend API server', color: '#d32f2f' },
    { name: 'React', description: 'Frontend UI framework', color: '#61dafb' },
    { name: 'SignalR', description: 'Real-time communication', color: '#9c27b0' },
    { name: 'Material-UI', description: 'Component library', color: '#007fff' },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* 标题区域 */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          🚀 Todo App
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          A modern hybrid desktop application showcasing the power of cross-platform development
        </Typography>
      </Paper>

      {/* 技术栈展示 */}
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            🛠️ Technology Stack
          </Typography>
          <Grid container spacing={3}>
            {technologies.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: tech.color,
                        mr: 2 
                      }} 
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: tech.color }}>
                      {tech.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {tech.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 特性展示 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
                🎯 Key Features
              </Typography>
              <Box sx={{ mt: 2 }}>
                {['Real-time updates', 'Modern UI/UX', 'Cross-platform', 'Responsive design', 'Type-safe development'].map((feature, index) => (
                  <Chip 
                    key={index}
                    label={feature} 
                    variant="outlined" 
                    sx={{ mr: 1, mb: 1, borderColor: '#1976d2', color: '#1976d2' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#388e3c' }}>
                🏗️ Architecture
              </Typography>
              <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                This application demonstrates a modern hybrid architecture combining desktop and web technologies:
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Desktop Shell:</strong> WPF provides native Windows integration
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Web Engine:</strong> WebView2 enables modern web rendering
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Backend API:</strong> ASP.NET Core serves as the data layer
              </Typography>
              <Typography variant="body2">
                • <strong>Frontend:</strong> React with Material-UI for rich user experience
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <Navigation />

          {/* 主内容区域 */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: '#ffffff',
              minHeight: '100vh',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clock" element={<Clock />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
