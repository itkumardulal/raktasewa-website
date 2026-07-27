import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EditNoteIcon from "@mui/icons-material/EditNote";

const DEFAULT_MSG =
  "Hi! I found your contact from the blood donation app. Are you available to donate blood?";

function cleanPhone(phone) {
  return String(phone || "").replace(/[^0-9]/g, "");
}

/**
 * Call / WhatsApp with optional custom message for public match results.
 */
export default function DonorContactActions({ phone, donorName }) {
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MSG);
  const digits = cleanPhone(phone);

  if (!digits) {
    return (
      <Typography variant="caption" color="text.secondary">
        Phone not available
      </Typography>
    );
  }

  const waHref = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" spacing={1}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          href={`tel:${digits}`}
          sx={{ py: 1.2 }}
        >
          Call <CallIcon fontSize="small" sx={{ ml: 1 }} />
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="success"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ py: 1.2 }}
        >
          WhatsApp <WhatsAppIcon fontSize="small" sx={{ ml: 1 }} />
        </Button>
      </Stack>

      <Button
        size="small"
        startIcon={<EditNoteIcon />}
        onClick={() => setOpenMsg((v) => !v)}
        sx={{ mt: 1 }}
      >
        {openMsg ? "Hide message" : "Customize WhatsApp message"}
      </Button>

      <Collapse in={openMsg}>
        <TextField
          fullWidth
          size="small"
          multiline
          minRows={2}
          label={`Message to ${donorName || "donor"}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mt: 1 }}
          helperText="Opens WhatsApp with this text. Edit, then tap WhatsApp again."
        />
      </Collapse>
    </Box>
  );
}
