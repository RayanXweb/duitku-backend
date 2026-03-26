const admin = require('../lib/firebase');

module.exports = async (req, res) => {
  const notification = req.body;

  const status = notification.transaction_status;
  const userId = notification.metadata?.userId;
  const amount = parseInt(notification.gross_amount);

  if (status === 'settlement') {
    const userRef = admin.firestore().collection('users').doc(userId);

    await userRef.update({
      balance: admin.firestore.FieldValue.increment(amount)
    });
  }

  res.send("OK");
};
