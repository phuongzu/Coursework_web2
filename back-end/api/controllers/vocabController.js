const mongoose = require('mongoose');
const Vocab = require('../models/vocabModel');

// Kiểm tra tính hợp lệ của ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.list_all_words = async (req, res) => {
  try {
    const words = await Vocab.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving words', error });
  }
};

exports.create_a_word = async (req, res) => {
  const newWord = new Vocab(req.body);
  try {
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create word', error });
  }
};

exports.read_a_word = async (req, res) => {
  const { wordId } = req.params;

  // Kiểm tra xem wordId có hợp lệ không
  if (!isValidObjectId(wordId)) {
    return res.status(400).json({ message: 'Invalid Word ID format' });
  }

  try {
    const word = await Vocab.findById(wordId);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving word', error });
  }
};

exports.update_a_word = async (req, res) => {
  const { wordId } = req.params;

  // Kiểm tra xem wordId có hợp lệ không
  if (!isValidObjectId(wordId)) {
    return res.status(400).json({ message: 'Invalid Word ID format' });
  }

  try {
    const updatedWord = await Vocab.findByIdAndUpdate(wordId, req.body, { new: true });
    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(updatedWord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating word', error });
  }
};

exports.delete_a_word = async (req, res) => {
  const { wordId } = req.params;
  if (!isValidObjectId(wordId)) {
    return res.status(400).json({ message: 'Invalid Word ID format' });
  }
  try {
    const deletedWord = await Vocab.findByIdAndDelete(wordId);
    if (!deletedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json({ message: 'Word successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting word', error });
  }
};
