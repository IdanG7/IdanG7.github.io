import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary to catch and display errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-card border-2 border-destructive/50 rounded-xl p-8 space-y-6">
              {/* Icon & Title */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-destructive/10 rounded-full">
                  <AlertTriangle className="w-12 h-12 text-destructive" />
                </div>
                <h1 className="text-3xl font-mono font-bold text-foreground">
                  Oops! Something went wrong
                </h1>
                <p className="text-muted-foreground">
                  Don't worry, it's not your fault. An unexpected error occurred.
                </p>
              </div>

              {/* Error details (collapsed by default in production) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="bg-muted/50 rounded-lg p-4">
                  <summary className="cursor-pointer font-mono text-sm text-destructive hover:text-destructive/80">
                    Error Details (Dev Only)
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-mono bg-background p-3 rounded border border-border overflow-auto">
                      <div className="text-destructive font-bold">
                        {this.state.error.toString()}
                      </div>
                      {this.state.errorInfo && (
                        <pre className="mt-2 text-muted-foreground whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReset}
                  size="lg"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </div>

              {/* Helpful message */}
              <div className="text-center text-sm text-muted-foreground">
                If this problem persists, please{' '}
                <a
                  href="mailto:Idan.gurevich@gmail.com"
                  className="text-primary hover:underline"
                >
                  contact me
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
