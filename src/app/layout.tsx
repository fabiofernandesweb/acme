import type { Metadata } from 'next';

export const  metadata: Metadata = {
  title: 'ACME'
};

export default function RootLayou({children}:{children: React.ReactNode}){
  return(
    <html lang='pt-br'>
      <body>
        
      </body>
    </html>
  )
}