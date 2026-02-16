const voteAttempts = new Map();

const RATE_LIMIT_WINDOW = 5000;

const canVote = (ip) => {
  const now = Date.now();
  const lastAttempt = voteAttempts.get(ip);

  if (lastAttempt && now - lastAttempt < RATE_LIMIT_WINDOW) {
    return false;
  }

  voteAttempts.set(ip, now);
  return true;
};

export default canVote;
