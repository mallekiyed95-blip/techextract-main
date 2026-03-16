import React from 'react';
export default function LogoLoop({ logos }: any) { 
  return (
    <div style={{ display: 'flex', gap: '40px', overflow: 'hidden', justifyContent: 'center' }}>
      {logos.map((logo: any, i: number) => <div key={i}>{logo.node}</div>)}
    </div>
  );
}
