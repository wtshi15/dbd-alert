const goodPerks = [
  "Barbecue & Chili",
  "Bardic Inspiration",
  "Decisive Strike",
  "Surge",
  "Scene Partner",
  "Resurgence"
];

export default async function handler(req, res) {
  const webhookUrl = process.env.DISCORD_WEBHOOK;

  const response = await fetch("https://api.nightlight.gg/v1/shrine?pretty=true");
  if (!response.ok) {
    return res.status(500).send("Failed to fetch shrine data");
  }

  const text = await response.text();
  const perks = text.split('|')[0].trim().split(',');

  for (const perk of perks) {
    if (goodPerks.includes(perk.trim())) {
      const content = `🚨 ALERT: @everyone Something just happened! ${perk.trim()}`;
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      return res.status(200).send("Alert sent");
    }
  }

  res.status(200).send("No good perks found");
}
