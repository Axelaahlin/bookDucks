module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8896379999101f27bcb4151bbf15453a'),
  },
});
