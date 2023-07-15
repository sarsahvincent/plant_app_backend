import Order from '../models/orderModle.js';

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create an order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = await Order.create({ userId, productId, quantity });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { userId, productId, quantity } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { userId, productId, quantity },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
