import { Box, Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Backend integration here
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Left Side - Form Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  mb: 2,
                  display: 'block'
                }}
              >
                LIÊN HỆ CHÚNG TÔI
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Gửi tin nhắn cho chúng tôi
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 4
                }}
              >
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. 
                Điền thông tin vào form bên cạnh và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </Typography>

              {/* Stats */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderLeft: '3px solid',
                    borderLeftColor: 'secondary.main',
                    borderRadius: 2
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      color: 'secondary.main',
                      mb: 0.5
                    }}
                  >
                    {'< 2h'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    Thời gian phản hồi trung bình
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderLeft: '3px solid',
                    borderLeftColor: '#f39c12',
                    borderRadius: 2
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      color: '#f39c12',
                      mb: 0.5
                    }}
                  >
                    98%
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    Tỷ lệ hài lòng của khách hàng
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: '#ffffff'
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      Họ và tên *
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      Số điện thoại *
                    </Typography>
                    <TextField
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0912345678"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      Email *
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      Chủ đề *
                    </Typography>
                    <TextField
                      fullWidth
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tiêu đề câu hỏi của bạn"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      Nội dung tin nhắn *
                    </Typography>
                    <TextField
                      fullWidth
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Nhập nội dung chi tiết câu hỏi của bạn..."
                      multiline
                      rows={6}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'secondary.main',
                            borderWidth: '2px'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        bgcolor: 'secondary.main',
                        color: '#fff',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(231, 76, 60, 0.25)',
                        '&:hover': {
                          bgcolor: 'secondary.dark',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(231, 76, 60, 0.35)'
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      Gửi tin nhắn
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
