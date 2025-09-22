import { Box, Button } from "@mui/material";

export default function AiCompanion() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", p: 4 }}>
      <Box sx={{ maxWidth: 400 }}>
        <h2>AI Companion</h2>
        <p>Trò chuyện cùng với AI về các chủ đề hoặc vấn đề mà bạn quan tâm.</p>
        <Button variant="contained">Xem thêm</Button>
      </Box>
      <img src="/ai.jpg" alt="AI Companion" style={{ width: 300 }} />
    </Box>
  );
}
