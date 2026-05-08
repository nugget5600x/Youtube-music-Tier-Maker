const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.YOUTUBE_API_KEY || '';

app.get('/api/playlist', async (req, res) => {
  const { playlistId, pageToken } = req.query;
  if (!playlistId) return res.status(400).json({ error: 'Missing playlistId' });
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured' });
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}${pageToken ? '&pageToken=' + pageToken : ''}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/playlist-title', async (req, res) => {
  const { playlistId } = req.query;
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured' });
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3456;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ running on port ${PORT}`));
