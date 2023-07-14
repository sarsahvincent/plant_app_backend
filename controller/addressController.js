// import  } from 'express';
import Address, { AddressModel } from "../models/address.model";

// Get all addresses
export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create an address
export const createAddress = async (req, res) => {
  try {
    const { street, city, state, country } = req.body;
    const address = await Address.create({ street, city, state, country });
    res.status(201).json(address);
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
