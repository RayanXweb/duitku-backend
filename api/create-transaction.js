const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

module.exports = async (req, res) => {
  const { amount, userId } = req.body;

  const parameter = {
    transaction_details: {
      order_id: "ORDER-" + Date.now(),
      gross_amount: amount
    },
    metadata: {
      userId: userId
    }
  };

  const transaction = await snap.createTransaction(parameter);

  res.json({
    token: transaction.token
  });
};
