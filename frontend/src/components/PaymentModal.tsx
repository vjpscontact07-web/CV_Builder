import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import axios from 'axios';

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
}

export default function PaymentModal({ open, onClose, onSuccess, amount }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePayment = async () => {
        if (!cardNumber || !expiry || !cvc) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/payment/verify`, {
                amount,
                currency: 'USD',
                paymentMethodId: 'mock_card'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Secure Payment</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Amount to pay: <b>${amount}</b>
                    </Typography>

                    <TextField
                        label="Card Number"
                        fullWidth
                        margin="dense"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
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
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button
                    onClick={handlePayment}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Processing...' : `Pay $${amount}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
