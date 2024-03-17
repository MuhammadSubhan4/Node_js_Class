import express from 'express';
import Ads from '../models/Ads.mjs';

const router = express.Router();

// GET: localhost:3001/ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ads.find();
    res.send({ message: 'Ads fetched successfully', data: ads });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// GET: localhost:3001/ads/:id
router.get('/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    const singleAd = await Ads.findById(adId);

    if (!singleAd) {
      return res.status(404).send({ message: 'Ad not found' });
    }

    res.send({ message: 'Ad fetched successfully', data: singleAd });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// POST: localhost:3001/ads/post
router.post('/post', async (req, res) => {
  try {
    const ad = new Ads(req.body);
    await ad.save();

    res.send({ message: 'Ad posted successfully' });
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error', error: e.message });
  }
});

// PUT: localhost:3001/ads/:id
router.put('/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    const updatedAd = await Ads.findByIdAndUpdate(adId, req.body, { new: true });

    if (!updatedAd) {
      return res.status(404).send({ message: 'Ad not found for update' });
    }

    res.send({ message: 'Ad updated successfully', data: updatedAd });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// DELETE: localhost:3001/ads/:id
router.delete('/:id', async (req, res) => {
  try {
    const adId = req.params.id;
    const deletedAd = await Ads.findByIdAndDelete(adId);

    if (!deletedAd) {
      return res.status(404).send({ message: 'Ad not found for deletion' });
    }

    res.send({ message: 'Ad deleted successfully', data: deletedAd });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;
