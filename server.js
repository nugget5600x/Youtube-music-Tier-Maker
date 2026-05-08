const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());
app.use(express.static(__dirname));

// Proxy: playlist items
app.get('/api/playlist', async (req, res) => {
  const { playlistId, apiKey, pageToken } = req.query;
  if (!playlistId || !apiKey) return res.status(400).json({ error: 'Missing params' });
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}${pageToken ? '&pageToken=' + pageToken : ''}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// Proxy: playlist title
app.get('/api/playlist-title', async (req, res) => {
  const { playlistId, apiKey } = req.query;
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// Audio stream via ytdl
app.get('/api/audio/:videoId', async (req, res) => {
  const { videoId } = req.params;
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return res.status(400).send('Invalid video ID');
  }
  try {
    res.setHeader('Content-Type', 'audio/webm');
    res.setHeader('Transfer-Encoding', 'chunked');
    const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
      filter: 'audioonly',
      quality: 'highestaudio'
    });
    stream.on('error', (e) => {
      console.error('ytdl error:', e.message);
      if (!res.headersSent) res.status(500).send('Stream error');
      else res.end();
    });
    stream.pipe(res);
  } catch(e) {
    if (!res.headersSent) res.status(500).send(e.message);
  }
});

const PORT = 3456;
app.listen(PORT, () => {
  console.log('\n✅ YT Tier Maker running at http://localhost:' + PORT + '\n');
});
