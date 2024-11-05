const { exec } = require('child_process');

const devApp = process.argv[2];

const sequentialExecution = async (...commands) => {
  if (commands.length === 0) {
    return 0;
  }

  await new Promise((resolve, reject) => {
    exec(commands.shift(), { stdio: 'inherit' }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });

  return sequentialExecution(...commands);
};

sequentialExecution(
  `pnpm turbo run build --filter=@${devApp}^...`,
  `pnpm turbo run dev --filter=@${devApp}`
).catch((error) => {
  console.error('Error executing command:', error);
});
