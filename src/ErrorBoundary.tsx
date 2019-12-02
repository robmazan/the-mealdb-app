import React from "react";

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
      return <h1>{this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
