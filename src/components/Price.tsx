export function Price({ cents, currency = 'EUR' }: { cents: number; currency?: string }) {
  const v = (cents || 0) / 100;
  return <span>{v.toFixed(2)} {currency}</span>;
}
