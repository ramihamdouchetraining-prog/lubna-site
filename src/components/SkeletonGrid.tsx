import React from 'react';
export default function SkeletonGrid({count=8}:{count?:number}){
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({length: count}).map((_,i)=> (
        <div key={i} className="rounded-xl border bg-card p-3 animate-pulse">
          <div className="aspect-square rounded-lg bg-muted" />
          <div className="mt-3 h-4 w-3/4 bg-muted rounded" />
          <div className="mt-2 h-3 w-1/2 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
