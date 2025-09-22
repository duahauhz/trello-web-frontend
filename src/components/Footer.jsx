import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, LinkedIn, YouTube, Instagram } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#fff",
        color: "#0097a7",
        py: 6,
        borderTop: "1px solid #e0e0e0",
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cột logo + social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              SeniorCare
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#0097a7" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#0097a7" }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#0097a7" }}
              >
                <YouTube />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#0097a7" }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Các cột link */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Thông tin liên hệ
                </Typography>
                <FooterLink text="Page" />
                <FooterLink text="Page" />
                <FooterLink text="Page" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Miễn trừ trách nhiệm
                </Typography>
                <FooterLink text="Page" />
                <FooterLink text="Page" />
                <FooterLink text="Page" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Điều khoản sử dụng
                </Typography>
                <FooterLink text="Page" />
                <FooterLink text="Page" />
                <FooterLink text="Page" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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
