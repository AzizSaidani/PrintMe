const Subscription = require('../models/subscription.model');

exports.handleSubscription = async (req, res) => {
  try {
    const { email, tag } = req.body;

    if (!email || !tag) {
      return res.status(400).json({ message: 'Email and tag are required' });
    }

    if (tag === 'add') {
      // Check if the email already exists
      const existingSubscription = await Subscription.findOne({ email });
      if (existingSubscription) {
        return res.status(400).json({ message: 'Email already subscribed' });
      }

      // Add the email to the subscriptions collection
      const newSubscription = new Subscription({ email });
      await newSubscription.save();
      return res.status(201).json({ message: 'Email subscribed successfully' });
    } else if (tag === 'del') {
      // Remove the email from the subscriptions collection
      const deletedSubscription = await Subscription.findOneAndDelete({ email });
      if (!deletedSubscription) {
        return res.status(404).json({ message: 'Email not found' });
      }
      return res.status(200).json({ message: 'Email unsubscribed successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid tag' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
