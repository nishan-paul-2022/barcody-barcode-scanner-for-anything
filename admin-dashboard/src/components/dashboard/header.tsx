import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-8 text-xl font-bold">Barcody Admin</div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
