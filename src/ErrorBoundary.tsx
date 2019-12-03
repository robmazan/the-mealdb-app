import React from "react";
import styles from "./ErrorBoundary.module.scss";
import Center from "./shared/Center";

class ErrorBoundary extends React.Component<{}, { error: Error | undefined }> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Center>
          <section className={styles.error}>
            <h1 className={styles.errorTitle}>Error</h1>
            <p className={styles.errorDescription}>
              {this.state.error.name}: {this.state.error.message}
            </p>
          </section>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
