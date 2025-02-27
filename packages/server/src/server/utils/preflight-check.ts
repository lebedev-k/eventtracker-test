const requiredEnvVariables = [
  "MONGO_CONNECTION_STRING",
  "MONGO_DATABASE_NAME",
  "SERVER_PORT",
];

/**
 * Check that all required env variables are present
 */
export const preflightCheck = () => {
  const missingVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `You must define following env variables in order to run the app: ${missingVariables}`,
    );
  }
};
