import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { failed: boolean }

/** Catches errors while rendering, so a visitor sees a way forward instead of a blank page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="frame section on-page" style={{ minHeight: '100svh' }}>
        <h1 className="t-head">Something went wrong</h1>
        <p className="t-lead" style={{ marginTop: '1rem', maxWidth: '36ch' }}>
          This page could not be shown. Reload it, or email us at contact@algorudixai.com.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn" onClick={() => window.location.reload()}>Reload the page</button>
          <a className="link" href="mailto:contact@algorudixai.com">Email us</a>
        </div>
      </main>
    );
  }
}
