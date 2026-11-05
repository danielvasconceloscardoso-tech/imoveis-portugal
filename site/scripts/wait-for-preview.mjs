const origin = process.env.LIGHTHOUSE_BASE_URL || 'http://127.0.0.1:4323';
const deadline = Date.now() + 30_000;
while (true) {
  try {
    const response = await fetch(origin, { signal: AbortSignal.timeout(2000) });
    if (response.ok && (await response.text()).includes('Imóveis Portugal')) break;
  } catch {}
  if (Date.now() >= deadline) throw new Error(`Preview did not become ready: ${origin}`);
  await new Promise(resolve => setTimeout(resolve, 300));
}
console.log('Static preview ready');
