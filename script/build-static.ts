import { cp } from "fs/promises";
import { build as viteBuild } from "vite";

async function buildStatic() {
  console.log("building static client...");
  await viteBuild();

  // GitHub Pages uses 404.html as the SPA fallback.
  await cp("dist/public/index.html", "dist/public/404.html");
}

buildStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});
