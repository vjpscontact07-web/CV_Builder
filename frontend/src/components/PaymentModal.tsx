import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import axios from "axios";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

export default function PaymentModal({
  open,
  onClose,
  onSuccess,
  amount,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // nicer on mobile [web:36]

  const handlePayment = async () => {
    if (!cardNumber || !expiry || !cvc) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/verify`,
        {
          amount,
          currency: "USD",
          paymentMethodId: "mock_card",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={700}>
          Secure payment
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Enter your card details to complete the payment.
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2.5 }}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Amount to pay:{" "}
          <Typography component="span" fontWeight={700}>
            ${amount}
          </Typography>
        </Typography>

        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Card details
          </Typography>
        </Box>

        <TextField
          label="Card number"
          fullWidth
          margin="dense"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="0000 0000 0000 0000"
          inputProps={{ inputMode: "numeric" }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Expiry"
            fullWidth
            margin="dense"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
          />
          <TextField
            label="CVC"
            fullWidth
            margin="dense"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            inputProps={{ maxLength: 4 }}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1.5, display: "block" }}
        >
          This is a test payment screen. No real card will be charged.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1.5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          fullWidth={fullScreen}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          variant="contained"
          disabled={loading}
          fullWidth={fullScreen}
          sx={{ minWidth: 140 }}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={18} color="inherit" />
              <span>Processing...</span>
            </Box>
          ) : (
            `Pay $${amount}`
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
