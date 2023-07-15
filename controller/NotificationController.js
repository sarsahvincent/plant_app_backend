import Notification from '../models/notificationModel.js';

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a notification
export const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const notification = await Notification.create({ userId, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a notification
export const updateNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { userId, message, isRead } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { userId, message, isRead },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
