import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import DirectionProvider from '@/components/providers/direction-provider';
import { ChevronIcon } from '@/components/ui/chevron-icon';

const TestComponent = ({ locale }: { locale: string }) => (
  <NextIntlClientProvider locale={locale} messages={{}}>
    <DirectionProvider>
      <div data-testid="container">
        <ChevronIcon data-testid="chevron" />
      </div>
    </DirectionProvider>
  </NextIntlClientProvider>
);

describe('RTL Support', () => {
  test('Arabic layout direction', () => {
    render(<TestComponent locale="ar" />);
    expect(screen.getByTestId('container')).toHaveAttribute('dir', 'rtl');
  });

  test('Hebrew layout direction', () => {
    render(<TestComponent locale="he" />);
    expect(screen.getByTestId('container')).toHaveAttribute('dir', 'rtl');
  });

  test('English layout direction', () => {
    render(<TestComponent locale="en" />);
    expect(screen.getByTestId('container')).toHaveAttribute('dir', 'ltr');
  });

  test('Chevron direction in RTL', () => {
    render(<TestComponent locale="ar" />);
    const chevron = screen.getByTestId('chevron');
    expect(chevron).toHaveClass('rotate-180');
  });

  test('CSS RTL overrides', () => {
    render(<TestComponent locale="ar" />);
    const container = screen.getByTestId('container');
    const styles = window.getComputedStyle(container);
    expect(styles.direction).toBe('rtl');
    expect(styles.textAlign).toBe('right');
  });
}); 