import Support from '../models/support.model';

// Get all support requests
export const getAllSupportRequests = async (req, res) => {
  try {
    const supportRequests = await Support.find();
    res.json(supportRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a support request
export const createSupportRequest = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const supportRequest = await Support.create({ userId, message });
    res.status(201).json(supportRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a support request
export const updateSupportRequest = async (req, res) => {
  try {
    const supportRequestId = req.params.id;
    const { userId, message } = req.body;

    const supportRequest = await Support.findByIdAndUpdate(
      supportRequestId,
      { userId, message },
      { new: true }
    );

    if (!supportRequest) {
      return res.status(404).json({ error: 'Support request not found' });
    }

    res.json(supportRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a support request
export const deleteSupportRequest = async (req, res) => {
  try {
    const supportRequestId = req.params.id;
    const supportRequest = await Support.findByIdAndDelete(supportRequestId);

    if (!supportRequest) {
      return res.status(404).json({ error: 'Support request not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
