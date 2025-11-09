import {
  useColorScheme
} from "@mui/material/styles";
import {
  IconButton,
  Box,
  Tooltip
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip title={mode === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}>
      <IconButton
        onClick={handleToggle}
        sx={{
          border: '2px solid',
          borderColor: 'divider',
          color: 'text.primary',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'secondary.main',
            color: 'secondary.main',
            backgroundColor: 'transparent',
            transform: 'rotate(180deg)'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mode === 'light' ? (
            <LightModeIcon fontSize="small" />
          ) : (
            <DarkModeIcon fontSize="small" />
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
}
