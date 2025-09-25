import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, LinkedIn, YouTube, Instagram } from "@mui/icons-material";

// Logo SVG tự tạo (có thể thay bằng ảnh nếu muốn)
const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#00bcd4"/>
    <path d="M24 36c-6-2-10-6-10-12 0-4 3-7 7-7 2 0 4 1 5 3 1-2 3-3 5-3 4 0 7 3 7 7 0 6-4 10-10 12z" fill="#fff"/>
  </svg>
);

// Hiệu ứng sóng SVG động
const Wave = () => (
  <svg viewBox="0 0 1440 120" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 120, zIndex: 0 }}>
    <defs>
      <linearGradient id="footerWave" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#00838f" stopOpacity="0.9" />
      </linearGradient>
      <animateTransform attributeName="transform" type="translate" from="0 0" to="40 0" dur="6s" repeatCount="indefinite" />
    </defs>
    <path fill="url(#footerWave)" fillOpacity="1">
      <animate attributeName="d" dur="8s" repeatCount="indefinite"
        values="M0,40 Q360,80 720,40 T1440,40 V120 H0 Z;
                M0,60 Q360,20 720,60 T1440,60 V120 H0 Z;
                M0,40 Q360,80 720,40 T1440,40 V120 H0 Z" />
    </path>
  </svg>
);

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bgcolor: "#00838f",
        color: "#fff",
        pt: 10, // tăng padding top
        pb: 8, // tăng padding bottom
        mt: 0, // removed margin top
        overflow: "hidden",
        boxShadow: "0 -4px 24px rgba(0, 131, 143, 0.08)",
        minHeight: 220, // tăng chiều cao tối thiểu
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 2 }}>
        <Logo />
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff' }}>
          SeniorCare
        </Typography>
      </Box>
      <Typography align="center" sx={{ opacity: 0.92, fontSize: 18, mb: 1, zIndex: 1, position: 'relative' }}>
        Chăm sóc tận tâm - Kết nối yêu thương
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2, zIndex: 1, position: 'relative', flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: 15 }}>
          Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
        </Typography>
        <Typography sx={{ fontSize: 15 }}>
          Email: support@seniorcare.vn
        </Typography>
        <Typography sx={{ fontSize: 15 }}>
          Hotline: 1900 1234
        </Typography>
      </Box>
      <Typography align="center" sx={{ fontSize: 14, opacity: 0.7, mb: 0, zIndex: 1, position: 'relative' }}>
        © {new Date().getFullYear()} SeniorCare. All rights reserved.
      </Typography>
      <Wave />
    </Box>
  );
}

import PropTypes from "prop-types";

/* Helper component cho từng link */
function FooterLink({ text }) {
  return (
    <Typography variant="body2" sx={{ mb: 0.5 }}>
      <Link
        href="#"
        underline="hover"
        color="inherit"
        sx={{ "&:hover": { color: "#007c91" } }}
      >
        {text}
      </Link>
    </Typography>
  );
}

FooterLink.propTypes = {
  text: PropTypes.string.isRequired,
};
