'use client';
import {useEffect, useState} from 'react';

export default function ThemeToggle(){
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>(() => (typeof document!== 'undefined' && document.documentElement.classList.contains('dark')) ? 'dark' : 'light');
  useEffect(()=>{ setMounted(true); },[]);
  useEffect(()=>{
    if(!mounted) return;
    const root = document.documentElement;
    if(theme==='dark') root.classList.add('dark'); else root.classList.remove('dark');
    try{ localStorage.setItem('lubna-theme', theme); }catch{}
  },[mounted, theme]);
  useEffect(()=>{
    try{
      const saved = localStorage.getItem('lubna-theme');
      if(saved==='dark' || saved==='light') setTheme(saved as any);
    }catch{}
  },[]);

  return (
    <button
      type="button"
      aria-label={theme==='dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-accent/50 transition"
      onClick={()=> setTheme(t=> t==='dark'?'light':'dark')}
    >
      {theme==='dark' ? '🌙' : '☀️'}
    </button>
  );
}
