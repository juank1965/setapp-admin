import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "../assets/avatar.jpg",
  city: "Santiago de Cali",
  country: "COLOMBIA",
  jobTitle: "Senior Developer",
  name: "Juan Carlos Bastidas",
  depto: "Valle del Cauca",
};

export const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.depto}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Subir Foto de Perfil
      </Button>
    </CardActions>
  </Card>
);
