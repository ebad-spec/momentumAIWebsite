import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { setupAuth } from "./auth";
import { setupStripe } from "./stripe";
import { sendOgAwareIndex } from "./ogMeta";

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

app.use(cors({
  origin: true,
  credentials: true,
}));

// Stripe webhook needs raw body
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), (req, res, next) => next());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupAuth(app);
setupStripe(app);

// Serve the built slide deck at /deck.
const deckPublicPath = path.join(__dirname, "../public/deck");

app.get('/deck', (req, res) => {
  res.sendFile(path.join(deckPublicPath, "index.html"));
});
app.get('/deck/', (req, res) => {
  res.sendFile(path.join(deckPublicPath, "index.html"));
});

app.use('/deck', express.static(deckPublicPath));

const buildDir = path.join(__dirname, "../build");

app.use(express.static(buildDir));

app.get(["/research", "/research/mindtrace"], (req, res) => {
  sendOgAwareIndex(res, buildDir, req.path);
});

app.get(/^(?!\/api).*$/, (req, res) => {
  sendOgAwareIndex(res, buildDir, req.path);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
