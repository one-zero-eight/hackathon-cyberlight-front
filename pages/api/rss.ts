const RSS_FEED_URL =
  "https://habr.com/ru/rss/hubs/infosecurity/articles/?fl=ru";

export default async function handler(_: any, res: any) {
  const feed = await fetch(RSS_FEED_URL);
  const xml = await feed.text();
  res.setHeader("Content-Type", "text/xml");
  res.send(xml);
}
