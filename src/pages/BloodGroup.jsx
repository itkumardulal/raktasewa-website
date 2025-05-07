/*  src/pages/BloodGroup.jsx  */
import React from "react";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";

const maroon = "#c40000"; // feel free to tweak

const rows = [
  { type: "A+", donate: "A+  AB+", receive: "A+  A-  O+  O-" },
  { type: "O+", donate: "O+  A+  B+  AB+", receive: "O+  O-" },
  { type: "B+", donate: "B+  AB+", receive: "B+  B-  O+  O-" },
  { type: "AB+", donate: "AB+", receive: "Everyone" },
  { type: "A-", donate: "A-  A+  AB-  AB+", receive: "A-  O-" },
  { type: "O-", donate: "Everyone", receive: "O-" },
  { type: "B-", donate: "B-  B+  AB-  AB+", receive: "B-  O-" },
  { type: "AB-", donate: "AB-  AB+", receive: "AB-  A-  B-  O-" },
];

export default function BloodGroup() {
  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      {/* bigger heading */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.4 }}
      >
        KNOW MORE ABOUT YOUR BLOOD GROUP
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          {/* red banner */}
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  bgcolor: maroon,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textAlign: "center",
                  py: 1.5,
                }}
              >
                Compatible Blood Type Donors
              </TableCell>
            </TableRow>

            {/* column headers */}
            <TableRow>
              <TableCell sx={{ fontWeight: 700, py: 1.2, fontSize: "0.95rem" }}>
                Blood Type
              </TableCell>
              <TableCell sx={{ fontWeight: 700, py: 1.2, fontSize: "0.95rem" }}>
                Donate Blood To
              </TableCell>
              <TableCell sx={{ fontWeight: 700, py: 1.2, fontSize: "0.95rem" }}>
                Receive Blood From
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(({ type, donate, receive }) => (
              <TableRow key={type} hover>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: maroon,
                    py: 1.1,
                    fontSize: "0.95rem",
                  }}
                >
                  {type}
                </TableCell>
                <TableCell sx={{ py: 1.1, fontSize: "0.95rem" }}>
                  {donate}
                </TableCell>
                <TableCell sx={{ py: 1.1, fontSize: "0.95rem" }}>
                  {receive}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* bottom spacing */}
      <Box sx={{ height: 32 }} />
    </Container>
  );
}
