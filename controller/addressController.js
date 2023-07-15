import Address from "../models/addressModel.js";
import User from "../models/usersModel.js";

// Get all addresses
export const getAllAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create an address
export const createAddress = async (req, res) => {
  const { street, city, state, country } = req.body;

  if (!street || !city || !state || !country) {
    return res
      .status(400)
      .json({ error: "please provide all required fields" });
  } else {
    try {
      const address = await Address.create({ ...req.body, user: req.user._id });

      // Update the user's address
      await User.findByIdAndUpdate(
        req.user._id,
        { address: address._id },
        // { $push: { address: address._id } },
        { new: true }
      );

      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Update an address
export const getUserAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    console.log("addressId", addressId)
    const address = await Address.findById({ _id: addressId });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Update an address
export const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { street, city, state, country } = req.body;

    const address = await Address.findByIdAndUpdate(
      addressId,
      { street, city, state, country },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findByIdAndDelete(addressId);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
