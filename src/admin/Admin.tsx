// Placeholder until the admin editor lands (Phase 7 in TASKS.md).
export default function Admin({ onExit }: { onExit: () => void }) {
  return (
    <main className="frame section on-rest">
      <h1 className="t-head">Site admin</h1>
      <p className="t-body" style={{ marginTop: '1rem' }}>The content editor is being built.</p>
      <button type="button" className="link" onClick={onExit}>Back to the site</button>
    </main>
  );
}
