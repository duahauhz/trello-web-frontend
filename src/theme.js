import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Modern Book/Publication Theme - Minimalist & Elegant
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#1a1a1a', // Deep black for primary elements
          light: '#404040',
          dark: '#000000',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#e74c3c', // Vibrant red for accents and CTAs
          light: '#ff6b5b',
          dark: '#c0392b',
          contrastText: '#ffffff'
        },
        accent: {
          main: '#f39c12', // Golden accent for highlights
          light: '#f5b041',
          dark: '#d68910'
        },
        text: {
          primary: '#1a1a1a', // Deep black for main text
          secondary: '#666666', // Medium gray for secondary text
          disabled: '#b3b3b3'
        },
        background: {
          default: '#fafafa', // Off-white for main background
          paper: '#ffffff', // Pure white for cards/papers
          subtle: '#f5f5f5' // Light gray for subtle backgrounds
        },
        divider: '#e0e0e0',
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      },
      spacing: (factor) => `${0.5 * factor}rem`
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#ffffff',
          light: '#f5f5f5',
          dark: '#e0e0e0',
          contrastText: '#1a1a1a'
        },
        secondary: {
          main: '#ff6b5b',
          light: '#ff8a7a',
          dark: '#e74c3c',
          contrastText: '#ffffff'
        },
        accent: {
          main: '#f5b041',
          light: '#f8c471',
          dark: '#f39c12'
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#b3b3b3',
          disabled: '#666666'
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
          subtle: '#2a2a2a'
        },
        divider: '#333333',
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      marginBottom: '1.5rem'
    },
    h2: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      marginBottom: '1.25rem'
    },
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '1rem'
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      fontWeight: 600,
      lineHeight: 1.5,
      marginBottom: '0.875rem'
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.6
    },
    body1: {
      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
      lineHeight: 1.8,
      letterSpacing: '0.01em'
    },
    body2: {
      fontSize: 'clamp(0.875rem, 1.25vw, 1rem)',
      lineHeight: 1.7
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(0.875rem, 1.25vw, 1rem)',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em'
    },
    caption: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '10px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#f5f5f5'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#bdbdbd',
            borderRadius: '5px',
            '&:hover': {
              background: '#9e9e9e'
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)'
        })
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: 'clamp(0.875rem, 1.25vw, 1rem)',
          fontWeight: 600
        },
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          border: 'none',
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 6px rgba(231, 76, 60, 0.2)'
          }
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.text.primary,
          color: theme.palette.text.primary,
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.paper,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(26, 26, 26, 0.2)'
          }
        }),
        text: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.secondary.main
          }
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)'
          }
        })
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            backgroundColor: theme.palette.background.paper,
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: theme.palette.divider,
              borderWidth: '2px'
            },
            '&:hover fieldset': {
              borderColor: theme.palette.text.secondary
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.secondary.main,
              borderWidth: '2px'
            }
          }
        })
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.secondary.main,
            transform: 'scale(1.1)'
          }
        })
      }
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '4px',
          fontWeight: 500,
          transition: 'all 0.3s ease'
        }),
        filled: ({ theme }) => ({
          backgroundColor: theme.palette.grey[200],
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
          }
        })
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`
        }),
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
        }
      }
    }
  },
  shape: {
    borderRadius: 4
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 0, 0, 0.08)',
    '0 4px 16px rgba(0, 0, 0, 0.1)',
    '0 8px 24px rgba(0, 0, 0, 0.12)',
    '0 12px 32px rgba(0, 0, 0, 0.15)',
    '0 16px 48px rgba(0, 0, 0, 0.18)',
    '0 20px 64px rgba(0, 0, 0, 0.2)',
    ...Array(18).fill('none')
  ]
})

export default theme;