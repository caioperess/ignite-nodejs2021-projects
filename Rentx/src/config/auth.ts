export default {
  secret_token: process.env.TOKEN_SECRET,
  secret_refresh_token: process.env.REFRESH_TOKEN_SECRET,
  expires_in_token: '15m',
  expires_in_refresh_token: '1h',
  refresh_token_expires_time: 1,
};
