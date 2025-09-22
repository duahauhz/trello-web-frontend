import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  useColorScheme,
} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'




function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    console.log(selectedMode)
    setMode(selectedMode)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="label-select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box style={{display: 'flex', alightItems: 'center', gap: 1}}>
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{display: 'flex', alightItems: 'center', gap: 1}}>
            <DarkModeOutlinedIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{display: 'flex', alightItems: 'center', gap: 1}}>
            <SettingsBrightnessIcon fontSize='small' /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}


/**
 * The main application component that defines the routing structure.
 * 
 * Renders different components based on the current URL path using React Router.
 * - "/" renders the Home component.
 * - "/login" renders the Login component.
 *
 * @component
 * @returns {JSX.Element} The rendered application routes.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
