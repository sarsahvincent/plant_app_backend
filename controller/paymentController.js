import Payment from '../models/payment.model';

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a payment
export const createPayment = async (req, res) => {
  try {
    const { orderId, userId, amount, status } = req.body;
    const payment = await Payment.create({ orderId, userId, amount, status });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a payment
export const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { orderId, userId, amount, status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { orderId, userId, amount, status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findByIdAndDelete(paymentId);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
