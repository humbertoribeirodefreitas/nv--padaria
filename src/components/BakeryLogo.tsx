import React from 'react';
import { CakeIcon } from 'lucide-react';

interface BakeryLogoProps {
  className?: string;
}

const BakeryLogo: React.FC<BakeryLogoProps> = ({ className }) => {
  return <CakeIcon className={className} />;
};

export default BakeryLogo;