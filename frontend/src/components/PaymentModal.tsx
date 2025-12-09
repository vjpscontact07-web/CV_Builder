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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

const formatCardDisplay = (digits: string) =>
  digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
const digitsOnly = (s = "") => s.replace(/\D/g, "");

const getMMYYFromDayjs = (d: Dayjs) => {
  const mm = (d.month() + 1).toString().padStart(2, "0");
  const yy = d.year().toString().slice(-2);
  return `${mm}/${yy}`;
};
const parseMMYYToDayjs = (mmyy: string) => {
  const match = mmyy.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return null;
  const mm = Number(match[1]);
  const yy = Number(match[2]);
  const fullYear = 2000 + yy;
  return dayjs(`${fullYear}-${mm.toString().padStart(2, "0")}-01`);
};

const schema = yup.object({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry (MM/YY)")
    .test("not-in-past", "Card expired", (value) => {
      if (!value) return false;
      const d = parseMMYYToDayjs(value);
      if (!d) return false;
      return d.endOf("month").isAfter(dayjs().subtract(1, "day"));
    }),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
}).required();

type FormValues = yup.InferType<typeof schema>;

export default function PaymentModal({
  open,
  onClose,
  onSuccess,
  amount,
}: PaymentModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const submit = async (data: FormValues) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/verify`,
        {
          amount,
          currency: "USD",
          paymentMethodId: "mock_card",
          card: {
            number: data.cardNumber,
            expiry: data.expiry,
            cvc: data.cvc,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Payment successful!");
      onSuccess();
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleClose}
      maxWidth="xs"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{ sx: { borderRadius: fullScreen ? 0 : 3 } }}
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

        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => {
            const display = formatCardDisplay(field.value || "");
            return (
              <TextField
                label="Card number"
                fullWidth
                margin="dense"
                value={display}
                onChange={(e) => {
                  const digits = digitsOnly(e.target.value).slice(0, 16);
                  field.onChange(digits);
                }}
                placeholder="0000 0000 0000 0000"
                inputProps={{ inputMode: "numeric" }}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
              />
            );
          }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="expiry"
              control={control}
              render={({ field }) => {
                const pickerValue = field.value
                  ? parseMMYYToDayjs(field.value)
                  : null;
                return (
                  <DatePicker
                    views={["year", "month"]}
                    openTo="month"
                    label="Expiry (MM/YY)"
                    value={pickerValue}
                    onChange={(val) => {
                      if (!val) {
                        field.onChange("");
                        return;
                      }
                      field.onChange(getMMYYFromDayjs(val as Dayjs));
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "dense",
                        error: !!errors.expiry,
                        helperText: errors.expiry?.message,
                      },
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>

          <Controller
            name="cvc"
            control={control}
            render={({ field }) => (
              <TextField
                label="CVC"
                fullWidth
                margin="dense"
                {...field}
                onChange={(e) => {
                  const only = digitsOnly(e.target.value).slice(0, 4);
                  field.onChange(only);
                }}
                placeholder="123"
                inputProps={{ maxLength: 4, inputMode: "numeric" }}
                error={!!errors.cvc}
                helperText={errors.cvc?.message}
              />
            )}
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
        <Button onClick={handleClose} disabled={loading} fullWidth={fullScreen} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(submit)}
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
