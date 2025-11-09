import { useColorScheme } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LoginSelect from "./pages/LoginSelect";
import User from "./pages/User";
import Notifications from "./pages/Notifications";
import AiCompanion from "./pages/AiCompanion";
import AISS1 from "./pages/AISS1";
import ChatHistoryPage from "./pages/ChatHistoryPage";
import Booking from "./pages/Booking";
import SpecialtyDoctors from "./pages/SpecialtyDoctors";
import AllDoctors from "./pages/AllDoctors";
import DoctorDetail from "./pages/DoctorDetail";
import AppointmentBooking from "./pages/AppointmentBooking";
import News from "./pages/News";
import Support from "./pages/Support";
import Footer from "./components/Footer";
import ChatDetail from "./components/ai/ChatDetail";

// Doctor pages
import DoctorSignIn from "./pages/doctor/DoctorSignIn";
import DoctorSignUp from "./pages/doctor/DoctorSignUp";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";

/* Component chọn chế độ sáng/tối */
function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    console.log(selectedMode);
    setMode(selectedMode);
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

/* ===== App chính ===== */
export default function App() {
  return (
    <>
      {/* Có thể đặt <ModeSelect /> ở Header hoặc vị trí mong muốn */}
      {/* <ModeSelect /> */}

      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSelect />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/specialty/:specialtyId" element={<SpecialtyDoctors />} />
        <Route path="/booking/doctors" element={<AllDoctors />} />
        <Route path="/booking/doctor/:id" element={<DoctorDetail />} />
        <Route path="/booking/appointment/:id" element={<AppointmentBooking />} />
        <Route path="/news" element={<News />} />
        <Route path="/support" element={<Support />} />
        <Route path="/ai" element={<AiCompanion />} />
        <Route path="/ai/chat/:topicId" element={<AISS1 />} />
        <Route path="/ai/history" element={<ChatHistoryPage />} />
        <Route path="/ai/history/:id" element={<ChatDetail />} />
        
        {/* Doctor Routes */}
        <Route path="/doctor/signin" element={<DoctorSignIn />} />
        <Route path="/doctor/signup" element={<DoctorSignUp />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
      </Routes>
      
      <Footer />
    </>
  );
}
