import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from "../components/Header";

import { useAuth } from "../context/AuthContext";

const InfoItem = ({ icon, label, value }) => (
  <Box 
    sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 3,
      p: 2,
      borderRadius: 3,
      cursor: "pointer",
      position: "relative",
      transition: "all 0.3s ease",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 3,
        border: "2px solid transparent",
        transition: "all 0.3s ease",
      },
      "&:hover": {
        bgcolor: "rgba(0, 131, 143, 0.05)",
        transform: "translateX(8px)",
        "&::before": {
          border: "2px solid rgba(0, 131, 143, 0.2)",
        },
        "& .info-icon-button": {
          transform: "scale(1.1) rotate(5deg)",
          boxShadow: "0 8px 20px rgba(0, 131, 143, 0.2)",
        },
        "& .info-label": {
          color: "#00838f",
        },
        "& .info-value": {
          transform: "translateX(5px)",
          color: "#006064",
        }
      }
    }}
  >
    <IconButton 
      className="info-icon-button"
      sx={{ 
        bgcolor: "#e1f5fe", 
        color: "#00838f",
        width: 72,
        height: 72,
        boxShadow: "0 4px 12px rgba(0, 131, 143, 0.12)",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "#b3e5fc",
        },
      }}
    >
      {icon}
    </IconButton>
    <Box sx={{ transition: "all 0.3s ease" }}>
      <Typography 
        className="info-label"
        variant="subtitle1" 
        sx={{
          fontSize: "0.95rem",
          fontWeight: 500,
          mb: 0.5,
          color: "rgba(0, 0, 0, 0.6)",
          transition: "all 0.3s ease",
        }}
      >
        {label}
      </Typography>
      <Typography 
        className="info-value"
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#2c3e50",
          fontSize: "1.25rem",
          transition: "all 0.3s ease",
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

export default function User() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    avatar: user?.avatar || ""
  });

  const handleEditOpen = () => {
    setEditData({
      name: user?.name || "",
      age: user?.age || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address || ""
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = () => {
    // TODO: Implement save changes to backend
    console.log('Saving changes:', editData);
    // Cập nhật thông tin user trong AuthContext
    if (updateUser) {
      updateUser({
        ...user,
        ...editData
      });
    }
    setOpenEdit(false);
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 10% 10%, rgba(0, 131, 143, 0.03) 0%, transparent 50%)",
          animation: "moveGradient 15s ease infinite",
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 90% 90%, rgba(0, 172, 193, 0.03) 0%, transparent 50%)",
          animation: "moveGradient2 18s ease infinite",
          pointerEvents: "none",
          zIndex: 0,
        },
        "@keyframes moveGradient": {
          "0%": {
            transform: "translate(0, 0)",
          },
          "25%": {
            transform: "translate(10%, 10%)",
          },
          "50%": {
            transform: "translate(0, 20%)",
          },
          "75%": {
            transform: "translate(-10%, 10%)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
        "@keyframes moveGradient2": {
          "0%": {
            transform: "translate(0, 0)",
          },
          "25%": {
            transform: "translate(-10%, -10%)",
          },
          "50%": {
            transform: "translate(0, -20%)",
          },
          "75%": {
            transform: "translate(10%, -10%)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      }}
    >
      <Box 
        sx={{ 
          position: "absolute", 
          top: "10%", 
          left: "5%", 
          width: "20px", 
          height: "20px", 
          borderRadius: "50%",
          background: "rgba(0, 131, 143, 0.1)",
          animation: "float 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box 
        sx={{ 
          position: "absolute", 
          top: "60%", 
          right: "8%", 
          width: "35px", 
          height: "35px", 
          borderRadius: "50%",
          background: "rgba(0, 172, 193, 0.1)",
          animation: "float2 10s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0) scale(1)",
            },
            "50%": {
              transform: "translateY(-20px) scale(1.1)",
            },
          },
          "@keyframes float2": {
            "0%, 100%": {
              transform: "translateY(0) scale(1)",
            },
            "50%": {
              transform: "translateY(20px) scale(1.1)",
            },
          },
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <Header />
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{
            alignSelf: 'flex-start',
            mb: 4,
            color: "#00838f",
            "&:hover": {
              backgroundColor: "rgba(0, 131, 143, 0.08)",
            },
          }}
        >
          Quay lại trang chủ
        </Button>

        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "1000px",
            borderRadius: 3,
            overflow: "hidden",
            p: 6,
            bgcolor: "#ffffff",
            boxShadow: "0 10px 40px rgba(0, 131, 143, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: "bold",
                color: "#00838f",
                mb: 2,
              }}
            >
              {user?.name || "Nguyễn Văn A"}
            </Typography>

            <Box sx={{ display: "flex", gap: 10, width: "100%" }}>
              {/* Left side - Avatar */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  flexShrink: 0,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 20,
                    left: 20,
                    right: -20,
                    bottom: -20,
                    borderRadius: "25px",
                    background: "linear-gradient(135deg, rgba(0, 131, 143, 0.1), rgba(0, 131, 143, 0.05))",
                    zIndex: 0
                  }
                }}
              >
                <Box
                  component="img"
                  src={user?.avatar || "https://i.pravatar.cc/300"}
                  alt="User avatar"
                  sx={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "25px",
                    objectFit: "cover",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    position: "relative",
                    zIndex: 1,
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.18)",
                    }
                  }}
                />
              </Box>

              {/* Right side - Info */}
              <Box sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                gap: 4,
                bgcolor: "rgba(0, 131, 143, 0.02)",
                p: 4,
                borderRadius: 4,
                position: "relative",
                zIndex: 2,
              }}>
                {/* Age */}
                <InfoItem
                  icon={<PersonIcon sx={{ fontSize: 32 }} />}
                  label="Tuổi"
                  value={user?.age || "65"}
                />
                
                {/* Phone */}
                <InfoItem
                  icon={<PhoneIcon sx={{ fontSize: 32 }} />}
                  label="Số điện thoại"
                  value={user?.phone || "0123 456 789"}
                />
                
                {/* Email */}
                <InfoItem
                  icon={<EmailIcon sx={{ fontSize: 32 }} />}
                  label="Email"
                  value={user?.email || "a@example.com"}
                />
                
                {/* Address */}
                <InfoItem
                  icon={<HomeIcon sx={{ fontSize: 32 }} />}
                  label="Địa chỉ"
                  value={user?.address || "123 Đường ABC, Quận XYZ, TP.HCM"}
                />
              </Box>
            </Box>

            {/* Edit Button */}
            <Button
              variant="contained"
              onClick={handleEditOpen}
              sx={{
                width: "220px",
                height: "56px",
                bgcolor: "#00838f",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                mt: 2,
                whiteSpace: "nowrap",
                background: "linear-gradient(45deg, #00838f 30%, #00acc1 90%)",
                boxShadow: "0 6px 20px rgba(0, 131, 143, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #006064 30%, #0097a7 90%)",
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 25px rgba(0, 131, 143, 0.4)",
                },
                "&:active": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 5px 15px rgba(0, 131, 143, 0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s ease",
                },
                "&:hover::before": {
                  transform: "translateX(100%)",
                },
              }}
            >
              Chỉnh sửa thông tin
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Edit Dialog */}
      <Dialog 
        open={openEdit} 
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 131, 143, 0.2)",
            overflow: "hidden"
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: "#00838f", 
            fontSize: "1.5rem",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 131, 143, 0.1)",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon sx={{ fontSize: 28 }} />
            Chỉnh sửa thông tin
          </Box>
          <IconButton 
            onClick={handleEditClose} 
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              "&:hover": {
                bgcolor: "rgba(0, 131, 143, 0.08)",
                color: "#00838f",
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 3, 
            mt: 1,
            "& .MuiTextField-root": {
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#00838f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00838f",
                }
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#00838f",
              }
            }
          }}>
            {/* Avatar Edit Section */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              gap: 2,
              p: 3,
              bgcolor: "rgba(0, 131, 143, 0.04)",
              borderRadius: 3,
              position: "relative",
              overflow: "hidden"
            }}>
              <Box
                component="img"
                src={editData.avatar || "https://i.pravatar.cc/150"}
                alt="Edit avatar"
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  }
                }}
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{
                  color: "#00838f",
                  borderColor: "#00838f",
                  "&:hover": {
                    borderColor: "#006064",
                    bgcolor: "rgba(0, 131, 143, 0.08)",
                  }
                }}
              >
                Thay đổi ảnh
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // TODO: Implement image upload logic here
                      // For now, just preview the image
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setEditData({...editData, avatar: e.target.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </Box>

            {/* Text Fields */}
            <TextField
              label="Tên"
              fullWidth
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
            />
            <TextField
              label="Tuổi"
              fullWidth
              value={editData.age}
              onChange={(e) => setEditData({...editData, age: e.target.value})}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              value={editData.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
            />
            <TextField
              label="Email"
              fullWidth
              value={editData.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              multiline
              rows={2}
              value={editData.address}
              onChange={(e) => setEditData({...editData, address: e.target.value})}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(0, 131, 143, 0.1)" }}>
          <Button 
            onClick={handleEditClose} 
            sx={{ 
              color: "#666",
              px: 3,
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              }
            }}
          >
            Hủy bỏ
          </Button>
          <Button 
            onClick={handleEditSave}
            variant="contained"
            sx={{ 
              px: 3,
              bgcolor: "#00838f",
              background: "linear-gradient(45deg, #00838f 30%, #00acc1 90%)",
              boxShadow: "0 2px 8px rgba(0, 131, 143, 0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #006064 30%, #0097a7 90%)",
              }
            }}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

}