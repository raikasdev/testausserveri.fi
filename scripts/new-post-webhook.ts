import { exec } from 'child_process';

const postFolder = process.argv[process.argv.length - 1];

if (!postFolder) {
  console.error('No post slug provided!');
  process.exit(1);
}

console.log(`Post slug: ${postFolder}`);

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

if (!webhookUrl) {
  console.error('Webhook URL not provided!');
  process.exit(1);
}

const data = {
  content: `https://testausserveri.fi/syslog/${postFolder}`,
};

const sendWebhook = () => {
  const command = `curl -X POST -H "Content-Type: application/json" -d '${JSON.stringify(data)}' ${webhookUrl}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Webhook sent: ${stdout}`);
  });
};

sendWebhook();
