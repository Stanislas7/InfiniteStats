'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <Link href="/" className="flex items-center h-24 cursor-pointer">
      {currentTheme === 'dark' ? (
        <Image src="/logo-white.png" alt="Logo White" width={300} height={120} className="w-auto h-full" />
      ) : (
        <Image src="/logo-blue.png" alt="Logo Blue" width={300} height={120} className="w-auto h-full" />
      )}
    </Link>
  );
}