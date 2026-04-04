export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  console.log('Token => ' + token);

  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Token not provided.',
    });
  }

  console.log('Secret => ' + process.env.NUXT_TURNSTILE_SECRET_KEY);
  return await verifyTurnstileToken(token);
});
