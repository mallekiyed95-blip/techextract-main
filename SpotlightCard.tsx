import React from 'react';
export default function SpotlightCard({ children, spotlightColor }: any) { 
  return <div style={{height: '100%', background: spotlightColor || 'rgba(255,255,255,0.02)'}}>{children}</div>;
}
